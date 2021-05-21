
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
        const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function exclude_internal_props(props) {
        const result = {};
        for (const k in props)
            if (k[0] !== '$')
                result[k] = props[k];
        return result;
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : options.context || []),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.38.2' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev('SvelteDOMSetProperty', { node, property, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    const subscriber_queue = [];
    /**
     * Creates a `Readable` store that allows reading by subscription.
     * @param value initial value
     * @param {StartStopNotifier}start start and stop notifications for subscriptions
     */
    function readable(value, start) {
        return {
            subscribe: writable(value, start).subscribe
        };
    }
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = [];
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (let i = 0; i < subscribers.length; i += 1) {
                        const s = subscribers[i];
                        s[1]();
                        subscriber_queue.push(s, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.push(subscriber);
            if (subscribers.length === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                const index = subscribers.indexOf(subscriber);
                if (index !== -1) {
                    subscribers.splice(index, 1);
                }
                if (subscribers.length === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    const releaseEndpoint = readable('https://api.github.com/repos/files-community/files/releases/latest');
    const githubUrl = readable('https://github.com/files-community/files');
    const storeId = readable('9nghp3dx8hdx');

    /* src\common\Text\Title.svelte generated by Svelte v3.38.2 */

    const file$6 = "src\\common\\Text\\Title.svelte";

    function create_fragment$6(ctx) {
    	let h1;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			if (default_slot) default_slot.c();
    			attr_dev(h1, "class", "title svelte-1imlqkb");
    			toggle_class(h1, "text-center", /*center*/ ctx[0]);
    			add_location(h1, file$6, 5, 4, 61);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);

    			if (default_slot) {
    				default_slot.m(h1, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[1], dirty, null, null);
    				}
    			}

    			if (dirty & /*center*/ 1) {
    				toggle_class(h1, "text-center", /*center*/ ctx[0]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Title", slots, ['default']);
    	let { center = false } = $$props;
    	const writable_props = ["center"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Title> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("center" in $$props) $$invalidate(0, center = $$props.center);
    		if ("$$scope" in $$props) $$invalidate(1, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ center });

    	$$self.$inject_state = $$props => {
    		if ("center" in $$props) $$invalidate(0, center = $$props.center);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [center, $$scope, slots];
    }

    class Title extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, { center: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Title",
    			options,
    			id: create_fragment$6.name
    		});
    	}

    	get center() {
    		throw new Error("<Title>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set center(value) {
    		throw new Error("<Title>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\common\Text\Subtext.svelte generated by Svelte v3.38.2 */

    const file$5 = "src\\common\\Text\\Subtext.svelte";

    function create_fragment$5(ctx) {
    	let p;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

    	const block = {
    		c: function create() {
    			p = element("p");
    			if (default_slot) default_slot.c();
    			attr_dev(p, "class", "subtext svelte-orj6o0");
    			toggle_class(p, "text-center", /*center*/ ctx[0]);
    			add_location(p, file$5, 5, 4, 61);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);

    			if (default_slot) {
    				default_slot.m(p, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[1], dirty, null, null);
    				}
    			}

    			if (dirty & /*center*/ 1) {
    				toggle_class(p, "text-center", /*center*/ ctx[0]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Subtext", slots, ['default']);
    	let { center = false } = $$props;
    	const writable_props = ["center"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Subtext> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("center" in $$props) $$invalidate(0, center = $$props.center);
    		if ("$$scope" in $$props) $$invalidate(1, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ center });

    	$$self.$inject_state = $$props => {
    		if ("center" in $$props) $$invalidate(0, center = $$props.center);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [center, $$scope, slots];
    }

    class Subtext extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, { center: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Subtext",
    			options,
    			id: create_fragment$5.name
    		});
    	}

    	get center() {
    		throw new Error("<Subtext>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set center(value) {
    		throw new Error("<Subtext>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\common\Flex\Flex.svelte generated by Svelte v3.38.2 */

    const file$4 = "src\\common\\Flex\\Flex.svelte";

    function create_fragment$4(ctx) {
    	let div;
    	let div_class_value;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[12].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[11], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();

    			attr_dev(div, "class", div_class_value = "flex-container\r\n                " + (/*directions*/ ctx[8].indexOf(/*direction*/ ctx[1]) > -1
    			? `direction-${/*direction*/ ctx[1]}`
    			: "") + "\r\n                " + (/*alignments*/ ctx[9].indexOf(/*align*/ ctx[2]) > -1
    			? `align-${/*align*/ ctx[2]}`
    			: "") + "\r\n                " + (/*alignments*/ ctx[9].indexOf(/*justify*/ ctx[3]) > -1
    			? `justify-${/*justify*/ ctx[3]}`
    			: "") + "\r\n                " + (/*$$props*/ ctx[10].class
    			? /*$$props*/ ctx[10].class
    			: "") + " svelte-gfmrjd");

    			attr_dev(div, "id", /*id*/ ctx[0]);
    			toggle_class(div, "wrap", /*wrap*/ ctx[5]);
    			toggle_class(div, "inline", /*inline*/ ctx[4]);
    			toggle_class(div, "reverse", /*reverse*/ ctx[6]);
    			toggle_class(div, "gap", /*gap*/ ctx[7]);
    			add_location(div, file$4, 15, 4, 429);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2048)) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[11], dirty, null, null);
    				}
    			}

    			if (!current || dirty & /*direction, align, justify, $$props*/ 1038 && div_class_value !== (div_class_value = "flex-container\r\n                " + (/*directions*/ ctx[8].indexOf(/*direction*/ ctx[1]) > -1
    			? `direction-${/*direction*/ ctx[1]}`
    			: "") + "\r\n                " + (/*alignments*/ ctx[9].indexOf(/*align*/ ctx[2]) > -1
    			? `align-${/*align*/ ctx[2]}`
    			: "") + "\r\n                " + (/*alignments*/ ctx[9].indexOf(/*justify*/ ctx[3]) > -1
    			? `justify-${/*justify*/ ctx[3]}`
    			: "") + "\r\n                " + (/*$$props*/ ctx[10].class
    			? /*$$props*/ ctx[10].class
    			: "") + " svelte-gfmrjd")) {
    				attr_dev(div, "class", div_class_value);
    			}

    			if (!current || dirty & /*id*/ 1) {
    				attr_dev(div, "id", /*id*/ ctx[0]);
    			}

    			if (dirty & /*direction, align, justify, $$props, wrap*/ 1070) {
    				toggle_class(div, "wrap", /*wrap*/ ctx[5]);
    			}

    			if (dirty & /*direction, align, justify, $$props, inline*/ 1054) {
    				toggle_class(div, "inline", /*inline*/ ctx[4]);
    			}

    			if (dirty & /*direction, align, justify, $$props, reverse*/ 1102) {
    				toggle_class(div, "reverse", /*reverse*/ ctx[6]);
    			}

    			if (dirty & /*direction, align, justify, $$props, gap*/ 1166) {
    				toggle_class(div, "gap", /*gap*/ ctx[7]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Flex", slots, ['default']);
    	let { id = "" } = $$props;
    	let { direction = "" } = $$props;
    	let { align = "" } = $$props;
    	let { justify = "" } = $$props;
    	let { inline = false } = $$props;
    	let { wrap = false } = $$props;
    	let { reverse = false } = $$props;
    	let { gap = false } = $$props;
    	const directions = ["row", "column", "row-reverse", "column-reverse"];
    	const alignments = ["center", "start", "end", "between", "around", "evenly"];

    	$$self.$$set = $$new_props => {
    		$$invalidate(10, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		if ("id" in $$new_props) $$invalidate(0, id = $$new_props.id);
    		if ("direction" in $$new_props) $$invalidate(1, direction = $$new_props.direction);
    		if ("align" in $$new_props) $$invalidate(2, align = $$new_props.align);
    		if ("justify" in $$new_props) $$invalidate(3, justify = $$new_props.justify);
    		if ("inline" in $$new_props) $$invalidate(4, inline = $$new_props.inline);
    		if ("wrap" in $$new_props) $$invalidate(5, wrap = $$new_props.wrap);
    		if ("reverse" in $$new_props) $$invalidate(6, reverse = $$new_props.reverse);
    		if ("gap" in $$new_props) $$invalidate(7, gap = $$new_props.gap);
    		if ("$$scope" in $$new_props) $$invalidate(11, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		id,
    		direction,
    		align,
    		justify,
    		inline,
    		wrap,
    		reverse,
    		gap,
    		directions,
    		alignments
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(10, $$props = assign(assign({}, $$props), $$new_props));
    		if ("id" in $$props) $$invalidate(0, id = $$new_props.id);
    		if ("direction" in $$props) $$invalidate(1, direction = $$new_props.direction);
    		if ("align" in $$props) $$invalidate(2, align = $$new_props.align);
    		if ("justify" in $$props) $$invalidate(3, justify = $$new_props.justify);
    		if ("inline" in $$props) $$invalidate(4, inline = $$new_props.inline);
    		if ("wrap" in $$props) $$invalidate(5, wrap = $$new_props.wrap);
    		if ("reverse" in $$props) $$invalidate(6, reverse = $$new_props.reverse);
    		if ("gap" in $$props) $$invalidate(7, gap = $$new_props.gap);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$props = exclude_internal_props($$props);

    	return [
    		id,
    		direction,
    		align,
    		justify,
    		inline,
    		wrap,
    		reverse,
    		gap,
    		directions,
    		alignments,
    		$$props,
    		$$scope,
    		slots
    	];
    }

    class Flex extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {
    			id: 0,
    			direction: 1,
    			align: 2,
    			justify: 3,
    			inline: 4,
    			wrap: 5,
    			reverse: 6,
    			gap: 7
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Flex",
    			options,
    			id: create_fragment$4.name
    		});
    	}

    	get id() {
    		throw new Error("<Flex>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<Flex>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get direction() {
    		throw new Error("<Flex>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set direction(value) {
    		throw new Error("<Flex>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get align() {
    		throw new Error("<Flex>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set align(value) {
    		throw new Error("<Flex>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get justify() {
    		throw new Error("<Flex>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set justify(value) {
    		throw new Error("<Flex>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get inline() {
    		throw new Error("<Flex>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set inline(value) {
    		throw new Error("<Flex>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get wrap() {
    		throw new Error("<Flex>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set wrap(value) {
    		throw new Error("<Flex>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get reverse() {
    		throw new Error("<Flex>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set reverse(value) {
    		throw new Error("<Flex>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get gap() {
    		throw new Error("<Flex>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set gap(value) {
    		throw new Error("<Flex>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\common\Button\Button.svelte generated by Svelte v3.38.2 */

    const file$3 = "src\\common\\Button\\Button.svelte";

    // (22:0) {:else}
    function create_else_block_1(ctx) {
    	let a;
    	let current_block_type_index;
    	let if_block;
    	let a_class_value;
    	let a_target_value;
    	let current;
    	const if_block_creators = [create_if_block_2, create_else_block_2];
    	const if_blocks = [];

    	function select_block_type_2(ctx, dirty) {
    		if (/*custom*/ ctx[1]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type_2(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			a = element("a");
    			if_block.c();

    			attr_dev(a, "class", a_class_value = "button " + (/*types*/ ctx[6].indexOf(/*type*/ ctx[0]) > -1
    			? `type-${/*type*/ ctx[0]}`
    			: "type-secondary") + " svelte-146slq9");

    			attr_dev(a, "type", "button");
    			attr_dev(a, "role", "button");

    			attr_dev(a, "target", a_target_value = /*target*/ ctx[4] === "_blank"
    			? /*target*/ ctx[4]
    			: undefined);

    			attr_dev(a, "href", /*href*/ ctx[3]);
    			attr_dev(a, "id", /*id*/ ctx[2]);
    			attr_dev(a, "disabled", /*disabled*/ ctx[5]);
    			add_location(a, file$3, 22, 4, 584);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			if_blocks[current_block_type_index].m(a, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type_2(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(a, null);
    			}

    			if (!current || dirty & /*type*/ 1 && a_class_value !== (a_class_value = "button " + (/*types*/ ctx[6].indexOf(/*type*/ ctx[0]) > -1
    			? `type-${/*type*/ ctx[0]}`
    			: "type-secondary") + " svelte-146slq9")) {
    				attr_dev(a, "class", a_class_value);
    			}

    			if (!current || dirty & /*target*/ 16 && a_target_value !== (a_target_value = /*target*/ ctx[4] === "_blank"
    			? /*target*/ ctx[4]
    			: undefined)) {
    				attr_dev(a, "target", a_target_value);
    			}

    			if (!current || dirty & /*href*/ 8) {
    				attr_dev(a, "href", /*href*/ ctx[3]);
    			}

    			if (!current || dirty & /*id*/ 4) {
    				attr_dev(a, "id", /*id*/ ctx[2]);
    			}

    			if (!current || dirty & /*disabled*/ 32) {
    				attr_dev(a, "disabled", /*disabled*/ ctx[5]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    			if_blocks[current_block_type_index].d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_1.name,
    		type: "else",
    		source: "(22:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (12:0) {#if !href}
    function create_if_block(ctx) {
    	let button;
    	let current_block_type_index;
    	let if_block;
    	let button_class_value;
    	let current;
    	const if_block_creators = [create_if_block_1, create_else_block];
    	const if_blocks = [];

    	function select_block_type_1(ctx, dirty) {
    		if (/*custom*/ ctx[1]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type_1(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			button = element("button");
    			if_block.c();

    			attr_dev(button, "class", button_class_value = "button " + (/*types*/ ctx[6].indexOf(/*type*/ ctx[0]) > -1
    			? `type-${/*type*/ ctx[0]}`
    			: "type-secondary") + " svelte-146slq9");

    			attr_dev(button, "type", "button");
    			attr_dev(button, "id", /*id*/ ctx[2]);
    			button.disabled = /*disabled*/ ctx[5];
    			add_location(button, file$3, 12, 4, 295);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			if_blocks[current_block_type_index].m(button, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type_1(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(button, null);
    			}

    			if (!current || dirty & /*type*/ 1 && button_class_value !== (button_class_value = "button " + (/*types*/ ctx[6].indexOf(/*type*/ ctx[0]) > -1
    			? `type-${/*type*/ ctx[0]}`
    			: "type-secondary") + " svelte-146slq9")) {
    				attr_dev(button, "class", button_class_value);
    			}

    			if (!current || dirty & /*id*/ 4) {
    				attr_dev(button, "id", /*id*/ ctx[2]);
    			}

    			if (!current || dirty & /*disabled*/ 32) {
    				prop_dev(button, "disabled", /*disabled*/ ctx[5]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			if_blocks[current_block_type_index].d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(12:0) {#if !href}",
    		ctx
    	});

    	return block;
    }

    // (26:8) {:else}
    function create_else_block_2(ctx) {
    	let span;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[8].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[7], null);

    	const block = {
    		c: function create() {
    			span = element("span");
    			if (default_slot) default_slot.c();
    			attr_dev(span, "class", "svelte-146slq9");
    			add_location(span, file$3, 26, 12, 844);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);

    			if (default_slot) {
    				default_slot.m(span, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 128)) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[7], dirty, null, null);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_2.name,
    		type: "else",
    		source: "(26:8) {:else}",
    		ctx
    	});

    	return block;
    }

    // (24:8) {#if custom}
    function create_if_block_2(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[8].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[7], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 128)) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[7], dirty, null, null);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(24:8) {#if custom}",
    		ctx
    	});

    	return block;
    }

    // (16:8) {:else}
    function create_else_block(ctx) {
    	let span;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[8].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[7], null);

    	const block = {
    		c: function create() {
    			span = element("span");
    			if (default_slot) default_slot.c();
    			attr_dev(span, "class", "svelte-146slq9");
    			add_location(span, file$3, 16, 12, 487);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);

    			if (default_slot) {
    				default_slot.m(span, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 128)) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[7], dirty, null, null);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(16:8) {:else}",
    		ctx
    	});

    	return block;
    }

    // (14:8) {#if custom}
    function create_if_block_1(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[8].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[7], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 128)) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[7], dirty, null, null);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(14:8) {#if custom}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block, create_else_block_1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (!/*href*/ ctx[3]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Button", slots, ['default']);
    	let { type = "secondary" } = $$props;
    	let { custom = false } = $$props;
    	let { id = undefined } = $$props;
    	let { href = undefined } = $$props;
    	let { target = undefined } = $$props;
    	let { disabled = undefined } = $$props;
    	const types = ["primary", "secondary"];
    	const writable_props = ["type", "custom", "id", "href", "target", "disabled"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Button> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("type" in $$props) $$invalidate(0, type = $$props.type);
    		if ("custom" in $$props) $$invalidate(1, custom = $$props.custom);
    		if ("id" in $$props) $$invalidate(2, id = $$props.id);
    		if ("href" in $$props) $$invalidate(3, href = $$props.href);
    		if ("target" in $$props) $$invalidate(4, target = $$props.target);
    		if ("disabled" in $$props) $$invalidate(5, disabled = $$props.disabled);
    		if ("$$scope" in $$props) $$invalidate(7, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		type,
    		custom,
    		id,
    		href,
    		target,
    		disabled,
    		types
    	});

    	$$self.$inject_state = $$props => {
    		if ("type" in $$props) $$invalidate(0, type = $$props.type);
    		if ("custom" in $$props) $$invalidate(1, custom = $$props.custom);
    		if ("id" in $$props) $$invalidate(2, id = $$props.id);
    		if ("href" in $$props) $$invalidate(3, href = $$props.href);
    		if ("target" in $$props) $$invalidate(4, target = $$props.target);
    		if ("disabled" in $$props) $$invalidate(5, disabled = $$props.disabled);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [type, custom, id, href, target, disabled, types, $$scope, slots];
    }

    class Button extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {
    			type: 0,
    			custom: 1,
    			id: 2,
    			href: 3,
    			target: 4,
    			disabled: 5
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Button",
    			options,
    			id: create_fragment$3.name
    		});
    	}

    	get type() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set type(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get custom() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set custom(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get id() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get href() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set href(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get target() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set target(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\common\PageSection\PageSection.svelte generated by Svelte v3.38.2 */

    const file$2 = "src\\common\\PageSection\\PageSection.svelte";

    function create_fragment$2(ctx) {
    	let section;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

    	const block = {
    		c: function create() {
    			section = element("section");
    			if (default_slot) default_slot.c();
    			attr_dev(section, "id", /*id*/ ctx[0]);
    			attr_dev(section, "class", "page-section svelte-1tqjosn");
    			add_location(section, file$2, 5, 4, 61);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);

    			if (default_slot) {
    				default_slot.m(section, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[1], dirty, null, null);
    				}
    			}

    			if (!current || dirty & /*id*/ 1) {
    				attr_dev(section, "id", /*id*/ ctx[0]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("PageSection", slots, ['default']);
    	let { id = undefined } = $$props;
    	const writable_props = ["id"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<PageSection> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("id" in $$props) $$invalidate(0, id = $$props.id);
    		if ("$$scope" in $$props) $$invalidate(1, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ id });

    	$$self.$inject_state = $$props => {
    		if ("id" in $$props) $$invalidate(0, id = $$props.id);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [id, $$scope, slots];
    }

    class PageSection extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { id: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "PageSection",
    			options,
    			id: create_fragment$2.name
    		});
    	}

    	get id() {
    		throw new Error("<PageSection>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<PageSection>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\Navbar.svelte generated by Svelte v3.38.2 */
    const file$1 = "src\\Navbar.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i];
    	child_ctx[4] = i;
    	return child_ctx;
    }

    // (15:12) {#each items as item, i}
    function create_each_block(ctx) {
    	let a;
    	let t0_value = /*item*/ ctx[2].name + "";
    	let t0;
    	let t1;
    	let a_href_value;
    	let a_target_value;
    	let a_rel_value;

    	const block = {
    		c: function create() {
    			a = element("a");
    			t0 = text(t0_value);
    			t1 = space();
    			attr_dev(a, "class", "navbar-item svelte-1qqy2it");
    			attr_dev(a, "href", a_href_value = /*item*/ ctx[2].href);
    			attr_dev(a, "target", a_target_value = /*item*/ ctx[2].external === true ? "_blank" : undefined);

    			attr_dev(a, "rel", a_rel_value = /*item*/ ctx[2].external === true
    			? "noreferrer noopener"
    			: undefined);

    			toggle_class(a, "selected", /*selectedItem*/ ctx[1] === /*i*/ ctx[4]);
    			add_location(a, file$1, 15, 16, 467);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, t0);
    			append_dev(a, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*items*/ 1 && t0_value !== (t0_value = /*item*/ ctx[2].name + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*items*/ 1 && a_href_value !== (a_href_value = /*item*/ ctx[2].href)) {
    				attr_dev(a, "href", a_href_value);
    			}

    			if (dirty & /*items*/ 1 && a_target_value !== (a_target_value = /*item*/ ctx[2].external === true ? "_blank" : undefined)) {
    				attr_dev(a, "target", a_target_value);
    			}

    			if (dirty & /*items*/ 1 && a_rel_value !== (a_rel_value = /*item*/ ctx[2].external === true
    			? "noreferrer noopener"
    			: undefined)) {
    				attr_dev(a, "rel", a_rel_value);
    			}

    			if (dirty & /*selectedItem*/ 2) {
    				toggle_class(a, "selected", /*selectedItem*/ ctx[1] === /*i*/ ctx[4]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(15:12) {#each items as item, i}",
    		ctx
    	});

    	return block;
    }

    // (21:8) <Button id="theme-button" custom>
    function create_default_slot$1(ctx) {
    	let svg;
    	let path;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			path = svg_element("path");
    			attr_dev(path, "d", "M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 20V4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20Z");
    			attr_dev(path, "fill", "currentColor");
    			add_location(path, file$1, 22, 16, 929);
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "width", "20");
    			attr_dev(svg, "height", "20");
    			attr_dev(svg, "viewBox", "0 0 24 24");
    			attr_dev(svg, "fill", "none");
    			add_location(svg, file$1, 21, 12, 816);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, path);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(21:8) <Button id=\\\"theme-button\\\" custom>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let header;
    	let nav;
    	let a;
    	let img;
    	let img_src_value;
    	let t0;
    	let div;
    	let t1;
    	let t2;
    	let button;
    	let current;
    	let each_value = /*items*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	button = new Button({
    			props: {
    				id: "theme-button",
    				custom: true,
    				$$slots: { default: [create_default_slot$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			header = element("header");
    			nav = element("nav");
    			a = element("a");
    			img = element("img");
    			t0 = space();
    			div = element("div");
    			t1 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t2 = space();
    			create_component(button.$$.fragment);
    			attr_dev(img, "class", "navbar-logo svelte-1qqy2it");
    			if (img.src !== (img_src_value = "https://files-community.github.io/img/logo.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "Files logo");
    			add_location(img, file$1, 11, 16, 232);
    			attr_dev(a, "href", "/");
    			add_location(a, file$1, 10, 12, 202);
    			attr_dev(div, "class", "navbar-divider svelte-1qqy2it");
    			attr_dev(div, "role", "separator");
    			add_location(div, file$1, 13, 12, 360);
    			attr_dev(nav, "class", "svelte-1qqy2it");
    			add_location(nav, file$1, 9, 8, 183);
    			attr_dev(header, "class", "navbar svelte-1qqy2it");
    			add_location(header, file$1, 8, 4, 150);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, header, anchor);
    			append_dev(header, nav);
    			append_dev(nav, a);
    			append_dev(a, img);
    			append_dev(nav, t0);
    			append_dev(nav, div);
    			append_dev(nav, t1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(nav, null);
    			}

    			append_dev(header, t2);
    			mount_component(button, header, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*items, undefined, selectedItem*/ 3) {
    				each_value = /*items*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(nav, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			const button_changes = {};

    			if (dirty & /*$$scope*/ 32) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(header);
    			destroy_each(each_blocks, detaching);
    			destroy_component(button);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Navbar", slots, []);
    	let { items = [] } = $$props;
    	let { selectedItem = undefined } = $$props;
    	const writable_props = ["items", "selectedItem"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Navbar> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("items" in $$props) $$invalidate(0, items = $$props.items);
    		if ("selectedItem" in $$props) $$invalidate(1, selectedItem = $$props.selectedItem);
    	};

    	$$self.$capture_state = () => ({ Button, items, selectedItem });

    	$$self.$inject_state = $$props => {
    		if ("items" in $$props) $$invalidate(0, items = $$props.items);
    		if ("selectedItem" in $$props) $$invalidate(1, selectedItem = $$props.selectedItem);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [items, selectedItem];
    }

    class Navbar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { items: 0, selectedItem: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Navbar",
    			options,
    			id: create_fragment$1.name
    		});
    	}

    	get items() {
    		throw new Error("<Navbar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set items(value) {
    		throw new Error("<Navbar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get selectedItem() {
    		throw new Error("<Navbar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set selectedItem(value) {
    		throw new Error("<Navbar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\App.svelte generated by Svelte v3.38.2 */

    const { console: console_1 } = globals;
    const file = "src\\App.svelte";

    // (85:20) <Title>
    function create_default_slot_13(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Files");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_13.name,
    		type: "slot",
    		source: "(85:20) <Title>",
    		ctx
    	});

    	return block;
    }

    // (86:20) <Subtext>
    function create_default_slot_12(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("A modern file explorer that pushes the boundaries of the platform.");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_12.name,
    		type: "slot",
    		source: "(86:20) <Subtext>",
    		ctx
    	});

    	return block;
    }

    // (93:32) <Flex direction="column">
    function create_default_slot_11(ctx) {
    	let span0;
    	let t0;
    	let t1;
    	let t2;
    	let span1;

    	const block = {
    		c: function create() {
    			span0 = element("span");
    			t0 = text("Download ");
    			t1 = text(/*version*/ ctx[1]);
    			t2 = space();
    			span1 = element("span");
    			span1.textContent = "Microsoft Store";
    			attr_dev(span0, "class", "button-title");
    			add_location(span0, file, 93, 36, 4078);
    			attr_dev(span1, "class", "button-description");
    			add_location(span1, file, 94, 36, 4167);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span0, anchor);
    			append_dev(span0, t0);
    			append_dev(span0, t1);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, span1, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*version*/ 2) set_data_dev(t1, /*version*/ ctx[1]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span0);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(span1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_11.name,
    		type: "slot",
    		source: "(93:32) <Flex direction=\\\"column\\\">",
    		ctx
    	});

    	return block;
    }

    // (89:28) <Flex gap align="center">
    function create_default_slot_10(ctx) {
    	let svg;
    	let path;
    	let t;
    	let flex;
    	let current;

    	flex = new Flex({
    			props: {
    				direction: "column",
    				$$slots: { default: [create_default_slot_11] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			path = svg_element("path");
    			t = space();
    			create_component(flex.$$.fragment);
    			attr_dev(path, "d", "M12.25 38.5H35.75C36.7165 38.5 37.5 39.2835 37.5 40.25C37.5 41.1682 36.7929 41.9212 35.8935 41.9942L35.75 42H12.25C11.2835 42 10.5 41.2165 10.5 40.25C10.5 39.3318 11.2071 38.5788 12.1065 38.5058L12.25 38.5H35.75H12.25ZM23.6065 6.2558L23.75 6.25C24.6682 6.25 25.4212 6.95711 25.4942 7.85647L25.5 8V29.333L30.2931 24.5407C30.9765 23.8573 32.0846 23.8573 32.768 24.5407C33.4514 25.2242 33.4514 26.3322 32.768 27.0156L24.9898 34.7938C24.3064 35.4772 23.1984 35.4772 22.515 34.7938L14.7368 27.0156C14.0534 26.3322 14.0534 25.2242 14.7368 24.5407C15.4202 23.8573 16.5282 23.8573 17.2117 24.5407L22 29.329V8C22 7.08183 22.7071 6.32881 23.6065 6.2558L23.75 6.25L23.6065 6.2558Z");
    			attr_dev(path, "fill", "currentColor");
    			add_location(path, file, 90, 36, 3243);
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "width", "20");
    			attr_dev(svg, "height", "20");
    			attr_dev(svg, "viewBox", "0 0 48 48");
    			attr_dev(svg, "fill", "none");
    			add_location(svg, file, 89, 32, 3111);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, path);
    			insert_dev(target, t, anchor);
    			mount_component(flex, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const flex_changes = {};

    			if (dirty & /*$$scope, version*/ 66) {
    				flex_changes.$$scope = { dirty, ctx };
    			}

    			flex.$set(flex_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(flex.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(flex.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (detaching) detach_dev(t);
    			destroy_component(flex, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_10.name,
    		type: "slot",
    		source: "(89:28) <Flex gap align=\\\"center\\\">",
    		ctx
    	});

    	return block;
    }

    // (88:24) <Button type="primary" href={`ms-windows-store://pdp/?ProductId=${$storeId}`} custom>
    function create_default_slot_9(ctx) {
    	let flex;
    	let current;

    	flex = new Flex({
    			props: {
    				gap: true,
    				align: "center",
    				$$slots: { default: [create_default_slot_10] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(flex.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(flex, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const flex_changes = {};

    			if (dirty & /*$$scope, version*/ 66) {
    				flex_changes.$$scope = { dirty, ctx };
    			}

    			flex.$set(flex_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(flex.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(flex.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(flex, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_9.name,
    		type: "slot",
    		source: "(88:24) <Button type=\\\"primary\\\" href={`ms-windows-store://pdp/?ProductId=${$storeId}`} custom>",
    		ctx
    	});

    	return block;
    }

    // (104:32) <Flex direction="column">
    function create_default_slot_8(ctx) {
    	let span0;
    	let t1;
    	let span1;

    	const block = {
    		c: function create() {
    			span0 = element("span");
    			span0.textContent = "GitHub";
    			t1 = space();
    			span1 = element("span");
    			span1.textContent = "Files is open source!";
    			attr_dev(span0, "class", "button-title");
    			add_location(span0, file, 104, 36, 5373);
    			attr_dev(span1, "class", "button-description");
    			add_location(span1, file, 105, 36, 5450);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, span1, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(span1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_8.name,
    		type: "slot",
    		source: "(104:32) <Flex direction=\\\"column\\\">",
    		ctx
    	});

    	return block;
    }

    // (100:28) <Flex gap align="center">
    function create_default_slot_7(ctx) {
    	let svg;
    	let path;
    	let t;
    	let flex;
    	let current;

    	flex = new Flex({
    			props: {
    				direction: "column",
    				$$slots: { default: [create_default_slot_8] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			path = svg_element("path");
    			t = space();
    			create_component(flex.$$.fragment);
    			attr_dev(path, "fill-rule", "evenodd");
    			attr_dev(path, "fill", "currentColor");
    			attr_dev(path, "d", "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z");
    			add_location(path, file, 101, 36, 4613);
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "viewBox", "0 0 16 16");
    			attr_dev(svg, "width", "18");
    			attr_dev(svg, "height", "18");
    			add_location(svg, file, 100, 32, 4493);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, path);
    			insert_dev(target, t, anchor);
    			mount_component(flex, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const flex_changes = {};

    			if (dirty & /*$$scope*/ 64) {
    				flex_changes.$$scope = { dirty, ctx };
    			}

    			flex.$set(flex_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(flex.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(flex.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (detaching) detach_dev(t);
    			destroy_component(flex, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_7.name,
    		type: "slot",
    		source: "(100:28) <Flex gap align=\\\"center\\\">",
    		ctx
    	});

    	return block;
    }

    // (99:24) <Button href={$githubUrl} target="_blank" custom>
    function create_default_slot_6(ctx) {
    	let flex;
    	let current;

    	flex = new Flex({
    			props: {
    				gap: true,
    				align: "center",
    				$$slots: { default: [create_default_slot_7] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(flex.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(flex, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const flex_changes = {};

    			if (dirty & /*$$scope*/ 64) {
    				flex_changes.$$scope = { dirty, ctx };
    			}

    			flex.$set(flex_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(flex.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(flex.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(flex, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_6.name,
    		type: "slot",
    		source: "(99:24) <Button href={$githubUrl} target=\\\"_blank\\\" custom>",
    		ctx
    	});

    	return block;
    }

    // (87:20) <Flex id="hero-button-container" gap wrap>
    function create_default_slot_5(ctx) {
    	let button0;
    	let t;
    	let button1;
    	let current;

    	button0 = new Button({
    			props: {
    				type: "primary",
    				href: `ms-windows-store://pdp/?ProductId=${/*$storeId*/ ctx[2]}`,
    				custom: true,
    				$$slots: { default: [create_default_slot_9] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button1 = new Button({
    			props: {
    				href: /*$githubUrl*/ ctx[3],
    				target: "_blank",
    				custom: true,
    				$$slots: { default: [create_default_slot_6] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(button0.$$.fragment);
    			t = space();
    			create_component(button1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(button0, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(button1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const button0_changes = {};
    			if (dirty & /*$storeId*/ 4) button0_changes.href = `ms-windows-store://pdp/?ProductId=${/*$storeId*/ ctx[2]}`;

    			if (dirty & /*$$scope, version*/ 66) {
    				button0_changes.$$scope = { dirty, ctx };
    			}

    			button0.$set(button0_changes);
    			const button1_changes = {};
    			if (dirty & /*$githubUrl*/ 8) button1_changes.href = /*$githubUrl*/ ctx[3];

    			if (dirty & /*$$scope*/ 64) {
    				button1_changes.$$scope = { dirty, ctx };
    			}

    			button1.$set(button1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button0.$$.fragment, local);
    			transition_in(button1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button0.$$.fragment, local);
    			transition_out(button1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(button0, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(button1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5.name,
    		type: "slot",
    		source: "(87:20) <Flex id=\\\"hero-button-container\\\" gap wrap>",
    		ctx
    	});

    	return block;
    }

    // (84:16) <Flex direction="column" id="hero-left-container">
    function create_default_slot_4(ctx) {
    	let title;
    	let t0;
    	let subtext;
    	let t1;
    	let flex;
    	let current;

    	title = new Title({
    			props: {
    				$$slots: { default: [create_default_slot_13] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	subtext = new Subtext({
    			props: {
    				$$slots: { default: [create_default_slot_12] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	flex = new Flex({
    			props: {
    				id: "hero-button-container",
    				gap: true,
    				wrap: true,
    				$$slots: { default: [create_default_slot_5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(title.$$.fragment);
    			t0 = space();
    			create_component(subtext.$$.fragment);
    			t1 = space();
    			create_component(flex.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(title, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(subtext, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(flex, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const title_changes = {};

    			if (dirty & /*$$scope*/ 64) {
    				title_changes.$$scope = { dirty, ctx };
    			}

    			title.$set(title_changes);
    			const subtext_changes = {};

    			if (dirty & /*$$scope*/ 64) {
    				subtext_changes.$$scope = { dirty, ctx };
    			}

    			subtext.$set(subtext_changes);
    			const flex_changes = {};

    			if (dirty & /*$$scope, $githubUrl, $storeId, version*/ 78) {
    				flex_changes.$$scope = { dirty, ctx };
    			}

    			flex.$set(flex_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(title.$$.fragment, local);
    			transition_in(subtext.$$.fragment, local);
    			transition_in(flex.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(title.$$.fragment, local);
    			transition_out(subtext.$$.fragment, local);
    			transition_out(flex.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(title, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(subtext, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(flex, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4.name,
    		type: "slot",
    		source: "(84:16) <Flex direction=\\\"column\\\" id=\\\"hero-left-container\\\">",
    		ctx
    	});

    	return block;
    }

    // (115:28) <Flex align="center" id="app-preview-sidebar-header">
    function create_default_slot_3(ctx) {
    	let button;
    	let svg;
    	let path;
    	let t0;
    	let h5;

    	const block = {
    		c: function create() {
    			button = element("button");
    			svg = svg_element("svg");
    			path = svg_element("path");
    			t0 = space();
    			h5 = element("h5");
    			h5.textContent = "Files";
    			attr_dev(path, "d", "M2.75254 17.9997H21.2525C21.6667 17.9997 22.0025 18.3355 22.0025 18.7497C22.0025 19.1294 21.7204 19.4432 21.3543 19.4928L21.2525 19.4997H2.75254C2.33832 19.4997 2.00254 19.1639 2.00254 18.7497C2.00254 18.37 2.28469 18.0562 2.65077 18.0065L2.75254 17.9997H21.2525H2.75254ZM2.75254 11.5027H21.2525C21.6667 11.5027 22.0025 11.8385 22.0025 12.2527C22.0025 12.6324 21.7204 12.9462 21.3543 12.9959L21.2525 13.0027H2.75254C2.33832 13.0027 2.00254 12.6669 2.00254 12.2527C2.00254 11.873 2.28469 11.5592 2.65077 11.5095L2.75254 11.5027H21.2525H2.75254ZM2.75168 5.00293H21.2517C21.6659 5.00293 22.0017 5.33872 22.0017 5.75293C22.0017 6.13263 21.7195 6.44642 21.3535 6.49608L21.2517 6.50293H2.75168C2.33746 6.50293 2.00168 6.16714 2.00168 5.75293C2.00168 5.37323 2.28383 5.05944 2.64991 5.00978L2.75168 5.00293H21.2517H2.75168Z");
    			attr_dev(path, "fill", "currentColor");
    			attr_dev(path, "class", "svelte-x6bq5j");
    			add_location(path, file, 117, 40, 6137);
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "width", "18");
    			attr_dev(svg, "height", "18");
    			attr_dev(svg, "viewBox", "0 0 24 24");
    			attr_dev(svg, "fill", "none");
    			attr_dev(svg, "class", "svelte-x6bq5j");
    			add_location(svg, file, 116, 36, 6001);
    			attr_dev(button, "class", "sidebar-button svelte-x6bq5j");
    			add_location(button, file, 115, 32, 5933);
    			attr_dev(h5, "class", "svelte-x6bq5j");
    			add_location(h5, file, 120, 32, 7103);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			append_dev(button, svg);
    			append_dev(svg, path);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, h5, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(h5);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3.name,
    		type: "slot",
    		source: "(115:28) <Flex align=\\\"center\\\" id=\\\"app-preview-sidebar-header\\\">",
    		ctx
    	});

    	return block;
    }

    // (113:20) <Flex id="app-preview-splitview">
    function create_default_slot_2(ctx) {
    	let aside;
    	let flex;
    	let t0;
    	let ul;
    	let li0;
    	let t2;
    	let li1;
    	let t4;
    	let li2;
    	let t6;
    	let main;
    	let header;
    	let nav;
    	let div;
    	let current;

    	flex = new Flex({
    			props: {
    				align: "center",
    				id: "app-preview-sidebar-header",
    				$$slots: { default: [create_default_slot_3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			aside = element("aside");
    			create_component(flex.$$.fragment);
    			t0 = space();
    			ul = element("ul");
    			li0 = element("li");
    			li0.textContent = "test";
    			t2 = space();
    			li1 = element("li");
    			li1.textContent = "test";
    			t4 = space();
    			li2 = element("li");
    			li2.textContent = "test";
    			t6 = space();
    			main = element("main");
    			header = element("header");
    			nav = element("nav");
    			div = element("div");
    			div.textContent = "Tab 1";
    			attr_dev(li0, "class", "selected svelte-x6bq5j");
    			add_location(li0, file, 123, 32, 7219);
    			attr_dev(li1, "class", "svelte-x6bq5j");
    			add_location(li1, file, 124, 32, 7282);
    			attr_dev(li2, "class", "svelte-x6bq5j");
    			add_location(li2, file, 125, 32, 7328);
    			attr_dev(ul, "class", "svelte-x6bq5j");
    			add_location(ul, file, 122, 28, 7182);
    			attr_dev(aside, "class", "svelte-x6bq5j");
    			add_location(aside, file, 113, 24, 5811);
    			attr_dev(div, "class", "tab selected svelte-x6bq5j");
    			add_location(div, file, 131, 36, 7551);
    			attr_dev(nav, "class", "svelte-x6bq5j");
    			add_location(nav, file, 130, 32, 7509);
    			attr_dev(header, "class", "svelte-x6bq5j");
    			add_location(header, file, 129, 28, 7468);
    			attr_dev(main, "class", "svelte-x6bq5j");
    			add_location(main, file, 128, 24, 7433);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, aside, anchor);
    			mount_component(flex, aside, null);
    			append_dev(aside, t0);
    			append_dev(aside, ul);
    			append_dev(ul, li0);
    			append_dev(ul, t2);
    			append_dev(ul, li1);
    			append_dev(ul, t4);
    			append_dev(ul, li2);
    			insert_dev(target, t6, anchor);
    			insert_dev(target, main, anchor);
    			append_dev(main, header);
    			append_dev(header, nav);
    			append_dev(nav, div);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const flex_changes = {};

    			if (dirty & /*$$scope*/ 64) {
    				flex_changes.$$scope = { dirty, ctx };
    			}

    			flex.$set(flex_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(flex.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(flex.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(aside);
    			destroy_component(flex);
    			if (detaching) detach_dev(t6);
    			if (detaching) detach_dev(main);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(113:20) <Flex id=\\\"app-preview-splitview\\\">",
    		ctx
    	});

    	return block;
    }

    // (83:12) <Flex id="hero-inner-container" align="center" gap>
    function create_default_slot_1(ctx) {
    	let flex0;
    	let t0;
    	let div;
    	let flex1;
    	let t1;
    	let canvas_1;
    	let current;

    	flex0 = new Flex({
    			props: {
    				direction: "column",
    				id: "hero-left-container",
    				$$slots: { default: [create_default_slot_4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	flex1 = new Flex({
    			props: {
    				id: "app-preview-splitview",
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(flex0.$$.fragment);
    			t0 = space();
    			div = element("div");
    			create_component(flex1.$$.fragment);
    			t1 = space();
    			canvas_1 = element("canvas");
    			attr_dev(div, "class", "acrylic-material app-preview svelte-x6bq5j");
    			add_location(div, file, 111, 16, 5690);
    			attr_dev(canvas_1, "width", "32");
    			attr_dev(canvas_1, "height", "32");
    			attr_dev(canvas_1, "id", "background-canvas");
    			attr_dev(canvas_1, "class", "svelte-x6bq5j");
    			add_location(canvas_1, file, 139, 16, 7843);
    		},
    		m: function mount(target, anchor) {
    			mount_component(flex0, target, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div, anchor);
    			mount_component(flex1, div, null);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, canvas_1, anchor);
    			/*canvas_1_binding*/ ctx[4](canvas_1);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const flex0_changes = {};

    			if (dirty & /*$$scope, $githubUrl, $storeId, version*/ 78) {
    				flex0_changes.$$scope = { dirty, ctx };
    			}

    			flex0.$set(flex0_changes);
    			const flex1_changes = {};

    			if (dirty & /*$$scope*/ 64) {
    				flex1_changes.$$scope = { dirty, ctx };
    			}

    			flex1.$set(flex1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(flex0.$$.fragment, local);
    			transition_in(flex1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(flex0.$$.fragment, local);
    			transition_out(flex1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(flex0, detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div);
    			destroy_component(flex1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(canvas_1);
    			/*canvas_1_binding*/ ctx[4](null);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(83:12) <Flex id=\\\"hero-inner-container\\\" align=\\\"center\\\" gap>",
    		ctx
    	});

    	return block;
    }

    // (61:4) <PageSection id="hero-section">
    function create_default_slot(ctx) {
    	let navbar;
    	let t;
    	let flex;
    	let current;

    	navbar = new Navbar({
    			props: {
    				selectedItem: 0,
    				items: [
    					{ name: "Home", href: "/" },
    					{ name: "Docs", href: "/", external: true },
    					{
    						name: "Discord",
    						href: "/",
    						external: true
    					},
    					{
    						name: "GitHub",
    						href: "/",
    						external: true
    					}
    				]
    			},
    			$$inline: true
    		});

    	flex = new Flex({
    			props: {
    				id: "hero-inner-container",
    				align: "center",
    				gap: true,
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(navbar.$$.fragment);
    			t = space();
    			create_component(flex.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(navbar, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(flex, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const flex_changes = {};

    			if (dirty & /*$$scope, canvas, $githubUrl, $storeId, version*/ 79) {
    				flex_changes.$$scope = { dirty, ctx };
    			}

    			flex.$set(flex_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(navbar.$$.fragment, local);
    			transition_in(flex.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(navbar.$$.fragment, local);
    			transition_out(flex.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(navbar, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(flex, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(61:4) <PageSection id=\\\"hero-section\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let pagesection;
    	let current;

    	pagesection = new PageSection({
    			props: {
    				id: "hero-section",
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(pagesection.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(pagesection, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const pagesection_changes = {};

    			if (dirty & /*$$scope, canvas, $githubUrl, $storeId, version*/ 79) {
    				pagesection_changes.$$scope = { dirty, ctx };
    			}

    			pagesection.$set(pagesection_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(pagesection.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(pagesection.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(pagesection, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    async function getReleaseVersion(endpoint) {
    	return await fetch(endpoint).then(result => result.json()).then(result => {
    		if (result) return result.tag_name;
    	}).catch(err => {
    		console.error(err);
    		return "";
    	});
    }

    function instance($$self, $$props, $$invalidate) {
    	let $releaseEndpoint;
    	let $storeId;
    	let $githubUrl;
    	validate_store(releaseEndpoint, "releaseEndpoint");
    	component_subscribe($$self, releaseEndpoint, $$value => $$invalidate(5, $releaseEndpoint = $$value));
    	validate_store(storeId, "storeId");
    	component_subscribe($$self, storeId, $$value => $$invalidate(2, $storeId = $$value));
    	validate_store(githubUrl, "githubUrl");
    	component_subscribe($$self, githubUrl, $$value => $$invalidate(3, $githubUrl = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("App", slots, []);
    	let canvas;
    	let version = "";

    	onMount(() => {
    		document.body.className = "theme-light";

    		// Canvas
    		let time = 0;

    		const context = canvas.getContext("2d");

    		const getColor = (x, y, r, g, b) => {
    			context.fillStyle = `rgb(${r}, ${g}, ${b})`;
    			context.fillRect(x, y, 1, 1);
    		};

    		const red = (x, y, t) => {
    			return Math.floor(192 + 64 * Math.cos((x * x - y * y) / 300 + t));
    		};

    		const green = (x, y, t) => {
    			return Math.floor(192 + 64 * Math.sin((x * x * Math.cos(t / 4) + y * y * Math.sin(t / 3)) / 300));
    		};

    		const blue = (x, y, t) => {
    			return Math.floor(192 + 64 * Math.sin(5 * Math.sin(t / 9) + ((x - 100) * (x - 100) + (y - 100) * (y - 100)) / 1100));
    		};

    		let run = () => {
    			for (let x = 0; x <= 35; x++) {
    				for (let y = 0; y <= 35; y++) {
    					getColor(x, y, red(x, y, time), green(x, y, time), blue(x, y, time));
    				}
    			}

    			time += 0.05;
    			window.requestAnimationFrame(run);
    		};

    		run();

    		// Fetch our release version
    		(async () => {
    			$$invalidate(1, version = await getReleaseVersion($releaseEndpoint));
    		})();
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	function canvas_1_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			canvas = $$value;
    			$$invalidate(0, canvas);
    		});
    	}

    	$$self.$capture_state = () => ({
    		onMount,
    		releaseEndpoint,
    		storeId,
    		githubUrl,
    		Title,
    		Subtext,
    		Flex,
    		Button,
    		PageSection,
    		Navbar,
    		canvas,
    		version,
    		getReleaseVersion,
    		$releaseEndpoint,
    		$storeId,
    		$githubUrl
    	});

    	$$self.$inject_state = $$props => {
    		if ("canvas" in $$props) $$invalidate(0, canvas = $$props.canvas);
    		if ("version" in $$props) $$invalidate(1, version = $$props.version);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [canvas, version, $storeId, $githubUrl, canvas_1_binding];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
