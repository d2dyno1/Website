var app=function(){"use strict";function t(){}function e(t,e){for(const n in e)t[n]=e[n];return t}function n(t){return t()}function r(){return Object.create(null)}function o(t){t.forEach(n)}function s(t){return"function"==typeof t}function c(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function i(e,n,r){e.$$.on_destroy.push(function(e,...n){if(null==e)return t;const r=e.subscribe(...n);return r.unsubscribe?()=>r.unsubscribe():r}(n,r))}function l(t,e,n,r){if(t){const o=u(t,e,n,r);return t[0](o)}}function u(t,n,r,o){return t[1]&&o?e(r.ctx.slice(),t[1](o(n))):r.ctx}function a(t,e,n,r,o,s,c){const i=function(t,e,n,r){if(t[2]&&r){const o=t[2](r(n));if(void 0===e.dirty)return o;if("object"==typeof o){const t=[],n=Math.max(e.dirty.length,o.length);for(let r=0;r<n;r+=1)t[r]=e.dirty[r]|o[r];return t}return e.dirty|o}return e.dirty}(e,r,o,s);if(i){const o=u(e,n,r,c);t.p(o,i)}}function f(t){const e={};for(const n in t)"$"!==n[0]&&(e[n]=t[n]);return e}function $(t,e){t.appendChild(e)}function d(t,e,n){t.insertBefore(e,n||null)}function p(t){t.parentNode.removeChild(t)}function m(t){return document.createElement(t)}function g(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function h(t){return document.createTextNode(t)}function x(){return h(" ")}function y(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function b(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function w(t,e,n){t.classList[n?"add":"remove"](e)}let v;function C(t){v=t}function _(t){(function(){if(!v)throw new Error("Function called outside component initialization");return v})().$$.on_mount.push(t)}const q=[],M=[],j=[],k=[],L=Promise.resolve();let O=!1;function H(t){j.push(t)}let E=!1;const F=new Set;function A(){if(!E){E=!0;do{for(let t=0;t<q.length;t+=1){const e=q[t];C(e),I(e.$$)}for(C(null),q.length=0;M.length;)M.pop()();for(let t=0;t<j.length;t+=1){const e=j[t];F.has(e)||(F.add(e),e())}j.length=0}while(q.length);for(;k.length;)k.pop()();O=!1,E=!1,F.clear()}}function I(t){if(null!==t.fragment){t.update(),o(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(H)}}const N=new Set;let S;function V(){S={r:0,c:[],p:S}}function B(){S.r||o(S.c),S=S.p}function Z(t,e){t&&t.i&&(N.delete(t),t.i(e))}function D(t,e,n,r){if(t&&t.o){if(N.has(t))return;N.add(t),S.c.push((()=>{N.delete(t),r&&(n&&t.d(1),r())})),t.o(e)}}function P(t){t&&t.c()}function T(t,e,r,c){const{fragment:i,on_mount:l,on_destroy:u,after_update:a}=t.$$;i&&i.m(e,r),c||H((()=>{const e=l.map(n).filter(s);u?u.push(...e):o(e),t.$$.on_mount=[]})),a.forEach(H)}function z(t,e){const n=t.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function G(t,e){-1===t.$$.dirty[0]&&(q.push(t),O||(O=!0,L.then(A)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function R(e,n,s,c,i,l,u=[-1]){const a=v;C(e);const f=e.$$={fragment:null,ctx:null,props:l,update:t,not_equal:i,bound:r(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(a?a.$$.context:n.context||[]),callbacks:r(),dirty:u,skip_bound:!1};let $=!1;if(f.ctx=s?s(e,n.props||{},((t,n,...r)=>{const o=r.length?r[0]:n;return f.ctx&&i(f.ctx[t],f.ctx[t]=o)&&(!f.skip_bound&&f.bound[t]&&f.bound[t](o),$&&G(e,t)),n})):[],f.update(),$=!0,o(f.before_update),f.fragment=!!c&&c(f.ctx),n.target){if(n.hydrate){const t=function(t){return Array.from(t.childNodes)}(n.target);f.fragment&&f.fragment.l(t),t.forEach(p)}else f.fragment&&f.fragment.c();n.intro&&Z(e.$$.fragment),T(e,n.target,n.anchor,n.customElement),A()}C(a)}class J{$destroy(){z(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const K=[];function Q(t,e){return{subscribe:U(t,e).subscribe}}function U(e,n=t){let r;const o=[];function s(t){if(c(e,t)&&(e=t,r)){const t=!K.length;for(let t=0;t<o.length;t+=1){const n=o[t];n[1](),K.push(n,e)}if(t){for(let t=0;t<K.length;t+=2)K[t][0](K[t+1]);K.length=0}}}return{set:s,update:function(t){s(t(e))},subscribe:function(c,i=t){const l=[c,i];return o.push(l),1===o.length&&(r=n(s)||t),c(e),()=>{const t=o.indexOf(l);-1!==t&&o.splice(t,1),0===o.length&&(r(),r=null)}}}}const W=Q("https://api.github.com/repos/files-community/files/releases/latest"),X=Q("https://github.com/files-community/files"),Y=Q("9nghp3dx8hdx");function tt(t){let e,n;const r=t[2].default,o=l(r,t,t[1],null);return{c(){e=m("h1"),o&&o.c(),y(e,"class","title svelte-1imlqkb"),w(e,"text-center",t[0])},m(t,r){d(t,e,r),o&&o.m(e,null),n=!0},p(t,[s]){o&&o.p&&(!n||2&s)&&a(o,r,t,t[1],s,null,null),1&s&&w(e,"text-center",t[0])},i(t){n||(Z(o,t),n=!0)},o(t){D(o,t),n=!1},d(t){t&&p(e),o&&o.d(t)}}}function et(t,e,n){let{$$slots:r={},$$scope:o}=e,{center:s=!1}=e;return t.$$set=t=>{"center"in t&&n(0,s=t.center),"$$scope"in t&&n(1,o=t.$$scope)},[s,o,r]}class nt extends J{constructor(t){super(),R(this,t,et,tt,c,{center:0})}}function rt(t){let e,n;const r=t[2].default,o=l(r,t,t[1],null);return{c(){e=m("p"),o&&o.c(),y(e,"class","subtext svelte-orj6o0"),w(e,"text-center",t[0])},m(t,r){d(t,e,r),o&&o.m(e,null),n=!0},p(t,[s]){o&&o.p&&(!n||2&s)&&a(o,r,t,t[1],s,null,null),1&s&&w(e,"text-center",t[0])},i(t){n||(Z(o,t),n=!0)},o(t){D(o,t),n=!1},d(t){t&&p(e),o&&o.d(t)}}}function ot(t,e,n){let{$$slots:r={},$$scope:o}=e,{center:s=!1}=e;return t.$$set=t=>{"center"in t&&n(0,s=t.center),"$$scope"in t&&n(1,o=t.$$scope)},[s,o,r]}class st extends J{constructor(t){super(),R(this,t,ot,rt,c,{center:0})}}function ct(t){let e,n,r;const o=t[12].default,s=l(o,t,t[11],null);return{c(){e=m("div"),s&&s.c(),y(e,"class",n="flex-container\r\n                "+(t[8].indexOf(t[1])>-1?`direction-${t[1]}`:"")+"\r\n                "+(t[9].indexOf(t[2])>-1?`align-${t[2]}`:"")+"\r\n                "+(t[9].indexOf(t[3])>-1?`justify-${t[3]}`:"")+"\r\n                "+(t[10].class?t[10].class:"")+" svelte-gfmrjd"),y(e,"id",t[0]),w(e,"wrap",t[5]),w(e,"inline",t[4]),w(e,"reverse",t[6]),w(e,"gap",t[7])},m(t,n){d(t,e,n),s&&s.m(e,null),r=!0},p(t,[c]){s&&s.p&&(!r||2048&c)&&a(s,o,t,t[11],c,null,null),(!r||1038&c&&n!==(n="flex-container\r\n                "+(t[8].indexOf(t[1])>-1?`direction-${t[1]}`:"")+"\r\n                "+(t[9].indexOf(t[2])>-1?`align-${t[2]}`:"")+"\r\n                "+(t[9].indexOf(t[3])>-1?`justify-${t[3]}`:"")+"\r\n                "+(t[10].class?t[10].class:"")+" svelte-gfmrjd"))&&y(e,"class",n),(!r||1&c)&&y(e,"id",t[0]),1070&c&&w(e,"wrap",t[5]),1054&c&&w(e,"inline",t[4]),1102&c&&w(e,"reverse",t[6]),1166&c&&w(e,"gap",t[7])},i(t){r||(Z(s,t),r=!0)},o(t){D(s,t),r=!1},d(t){t&&p(e),s&&s.d(t)}}}function it(t,n,r){let{$$slots:o={},$$scope:s}=n,{id:c=""}=n,{direction:i=""}=n,{align:l=""}=n,{justify:u=""}=n,{inline:a=!1}=n,{wrap:$=!1}=n,{reverse:d=!1}=n,{gap:p=!1}=n;return t.$$set=t=>{r(10,n=e(e({},n),f(t))),"id"in t&&r(0,c=t.id),"direction"in t&&r(1,i=t.direction),"align"in t&&r(2,l=t.align),"justify"in t&&r(3,u=t.justify),"inline"in t&&r(4,a=t.inline),"wrap"in t&&r(5,$=t.wrap),"reverse"in t&&r(6,d=t.reverse),"gap"in t&&r(7,p=t.gap),"$$scope"in t&&r(11,s=t.$$scope)},n=f(n),[c,i,l,u,a,$,d,p,["row","column","row-reverse","column-reverse"],["center","start","end","between","around","evenly"],n,s,o]}class lt extends J{constructor(t){super(),R(this,t,it,ct,c,{id:0,direction:1,align:2,justify:3,inline:4,wrap:5,reverse:6,gap:7})}}function ut(t){let e,n,r,o,s,c;const i=[$t,ft],l=[];function u(t,e){return t[1]?0:1}return n=u(t),r=l[n]=i[n](t),{c(){e=m("a"),r.c(),y(e,"class",o="button "+(t[6].indexOf(t[0])>-1?`type-${t[0]}`:"type-secondary")+" svelte-146slq9"),y(e,"type","button"),y(e,"role","button"),y(e,"target",s="_blank"===t[4]?t[4]:void 0),y(e,"href",t[3]),y(e,"id",t[2]),y(e,"disabled",t[5])},m(t,r){d(t,e,r),l[n].m(e,null),c=!0},p(t,a){let f=n;n=u(t),n===f?l[n].p(t,a):(V(),D(l[f],1,1,(()=>{l[f]=null})),B(),r=l[n],r?r.p(t,a):(r=l[n]=i[n](t),r.c()),Z(r,1),r.m(e,null)),(!c||1&a&&o!==(o="button "+(t[6].indexOf(t[0])>-1?`type-${t[0]}`:"type-secondary")+" svelte-146slq9"))&&y(e,"class",o),(!c||16&a&&s!==(s="_blank"===t[4]?t[4]:void 0))&&y(e,"target",s),(!c||8&a)&&y(e,"href",t[3]),(!c||4&a)&&y(e,"id",t[2]),(!c||32&a)&&y(e,"disabled",t[5])},i(t){c||(Z(r),c=!0)},o(t){D(r),c=!1},d(t){t&&p(e),l[n].d()}}}function at(t){let e,n,r,o,s;const c=[pt,dt],i=[];function l(t,e){return t[1]?0:1}return n=l(t),r=i[n]=c[n](t),{c(){e=m("button"),r.c(),y(e,"class",o="button "+(t[6].indexOf(t[0])>-1?`type-${t[0]}`:"type-secondary")+" svelte-146slq9"),y(e,"type","button"),y(e,"id",t[2]),e.disabled=t[5]},m(t,r){d(t,e,r),i[n].m(e,null),s=!0},p(t,u){let a=n;n=l(t),n===a?i[n].p(t,u):(V(),D(i[a],1,1,(()=>{i[a]=null})),B(),r=i[n],r?r.p(t,u):(r=i[n]=c[n](t),r.c()),Z(r,1),r.m(e,null)),(!s||1&u&&o!==(o="button "+(t[6].indexOf(t[0])>-1?`type-${t[0]}`:"type-secondary")+" svelte-146slq9"))&&y(e,"class",o),(!s||4&u)&&y(e,"id",t[2]),(!s||32&u)&&(e.disabled=t[5])},i(t){s||(Z(r),s=!0)},o(t){D(r),s=!1},d(t){t&&p(e),i[n].d()}}}function ft(t){let e,n;const r=t[8].default,o=l(r,t,t[7],null);return{c(){e=m("span"),o&&o.c(),y(e,"class","svelte-146slq9")},m(t,r){d(t,e,r),o&&o.m(e,null),n=!0},p(t,e){o&&o.p&&(!n||128&e)&&a(o,r,t,t[7],e,null,null)},i(t){n||(Z(o,t),n=!0)},o(t){D(o,t),n=!1},d(t){t&&p(e),o&&o.d(t)}}}function $t(t){let e;const n=t[8].default,r=l(n,t,t[7],null);return{c(){r&&r.c()},m(t,n){r&&r.m(t,n),e=!0},p(t,o){r&&r.p&&(!e||128&o)&&a(r,n,t,t[7],o,null,null)},i(t){e||(Z(r,t),e=!0)},o(t){D(r,t),e=!1},d(t){r&&r.d(t)}}}function dt(t){let e,n;const r=t[8].default,o=l(r,t,t[7],null);return{c(){e=m("span"),o&&o.c(),y(e,"class","svelte-146slq9")},m(t,r){d(t,e,r),o&&o.m(e,null),n=!0},p(t,e){o&&o.p&&(!n||128&e)&&a(o,r,t,t[7],e,null,null)},i(t){n||(Z(o,t),n=!0)},o(t){D(o,t),n=!1},d(t){t&&p(e),o&&o.d(t)}}}function pt(t){let e;const n=t[8].default,r=l(n,t,t[7],null);return{c(){r&&r.c()},m(t,n){r&&r.m(t,n),e=!0},p(t,o){r&&r.p&&(!e||128&o)&&a(r,n,t,t[7],o,null,null)},i(t){e||(Z(r,t),e=!0)},o(t){D(r,t),e=!1},d(t){r&&r.d(t)}}}function mt(t){let e,n,r,o;const s=[at,ut],c=[];function i(t,e){return t[3]?1:0}return e=i(t),n=c[e]=s[e](t),{c(){n.c(),r=h("")},m(t,n){c[e].m(t,n),d(t,r,n),o=!0},p(t,[o]){let l=e;e=i(t),e===l?c[e].p(t,o):(V(),D(c[l],1,1,(()=>{c[l]=null})),B(),n=c[e],n?n.p(t,o):(n=c[e]=s[e](t),n.c()),Z(n,1),n.m(r.parentNode,r))},i(t){o||(Z(n),o=!0)},o(t){D(n),o=!1},d(t){c[e].d(t),t&&p(r)}}}function gt(t,e,n){let{$$slots:r={},$$scope:o}=e,{type:s="secondary"}=e,{custom:c=!1}=e,{id:i}=e,{href:l}=e,{target:u}=e,{disabled:a}=e;return t.$$set=t=>{"type"in t&&n(0,s=t.type),"custom"in t&&n(1,c=t.custom),"id"in t&&n(2,i=t.id),"href"in t&&n(3,l=t.href),"target"in t&&n(4,u=t.target),"disabled"in t&&n(5,a=t.disabled),"$$scope"in t&&n(7,o=t.$$scope)},[s,c,i,l,u,a,["primary","secondary"],o,r]}class ht extends J{constructor(t){super(),R(this,t,gt,mt,c,{type:0,custom:1,id:2,href:3,target:4,disabled:5})}}function xt(t){let e,n;const r=t[2].default,o=l(r,t,t[1],null);return{c(){e=m("section"),o&&o.c(),y(e,"id",t[0]),y(e,"class","page-section svelte-1tqjosn")},m(t,r){d(t,e,r),o&&o.m(e,null),n=!0},p(t,[s]){o&&o.p&&(!n||2&s)&&a(o,r,t,t[1],s,null,null),(!n||1&s)&&y(e,"id",t[0])},i(t){n||(Z(o,t),n=!0)},o(t){D(o,t),n=!1},d(t){t&&p(e),o&&o.d(t)}}}function yt(t,e,n){let{$$slots:r={},$$scope:o}=e,{id:s}=e;return t.$$set=t=>{"id"in t&&n(0,s=t.id),"$$scope"in t&&n(1,o=t.$$scope)},[s,o,r]}class bt extends J{constructor(t){super(),R(this,t,yt,xt,c,{id:0})}}function wt(t,e,n){const r=t.slice();return r[2]=e[n],r[4]=n,r}function vt(t){let e,n,r,o,s,c,i=t[2].name+"";return{c(){e=m("a"),n=h(i),r=x(),y(e,"class","navbar-item svelte-1qqy2it"),y(e,"href",o=t[2].href),y(e,"target",s=!0===t[2].external?"_blank":void 0),y(e,"rel",c=!0===t[2].external?"noreferrer noopener":void 0),w(e,"selected",t[1]===t[4])},m(t,o){d(t,e,o),$(e,n),$(e,r)},p(t,r){1&r&&i!==(i=t[2].name+"")&&b(n,i),1&r&&o!==(o=t[2].href)&&y(e,"href",o),1&r&&s!==(s=!0===t[2].external?"_blank":void 0)&&y(e,"target",s),1&r&&c!==(c=!0===t[2].external?"noreferrer noopener":void 0)&&y(e,"rel",c),2&r&&w(e,"selected",t[1]===t[4])},d(t){t&&p(e)}}}function Ct(t){let e,n;return{c(){e=g("svg"),n=g("path"),y(n,"d","M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 20V4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20Z"),y(n,"fill","currentColor"),y(e,"xmlns","http://www.w3.org/2000/svg"),y(e,"width","20"),y(e,"height","20"),y(e,"viewBox","0 0 24 24"),y(e,"fill","none")},m(t,r){d(t,e,r),$(e,n)},d(t){t&&p(e)}}}function _t(t){let e,n,r,o,s,c,i,l,u,a=t[0],f=[];for(let e=0;e<a.length;e+=1)f[e]=vt(wt(t,a,e));return l=new ht({props:{id:"theme-button",custom:!0,$$slots:{default:[Ct]},$$scope:{ctx:t}}}),{c(){e=m("header"),n=m("nav"),r=m("a"),r.innerHTML='<img class="navbar-logo svelte-1qqy2it" src="https://files-community.github.io/img/logo.png" alt="Files logo"/>',o=x(),s=m("div"),c=x();for(let t=0;t<f.length;t+=1)f[t].c();i=x(),P(l.$$.fragment),y(r,"href","/"),y(s,"class","navbar-divider svelte-1qqy2it"),y(s,"role","separator"),y(n,"class","svelte-1qqy2it"),y(e,"class","navbar svelte-1qqy2it")},m(t,a){d(t,e,a),$(e,n),$(n,r),$(n,o),$(n,s),$(n,c);for(let t=0;t<f.length;t+=1)f[t].m(n,null);$(e,i),T(l,e,null),u=!0},p(t,[e]){if(3&e){let r;for(a=t[0],r=0;r<a.length;r+=1){const o=wt(t,a,r);f[r]?f[r].p(o,e):(f[r]=vt(o),f[r].c(),f[r].m(n,null))}for(;r<f.length;r+=1)f[r].d(1);f.length=a.length}const r={};32&e&&(r.$$scope={dirty:e,ctx:t}),l.$set(r)},i(t){u||(Z(l.$$.fragment,t),u=!0)},o(t){D(l.$$.fragment,t),u=!1},d(t){t&&p(e),function(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}(f,t),z(l)}}}function qt(t,e,n){let{items:r=[]}=e,{selectedItem:o}=e;return t.$$set=t=>{"items"in t&&n(0,r=t.items),"selectedItem"in t&&n(1,o=t.selectedItem)},[r,o]}class Mt extends J{constructor(t){super(),R(this,t,qt,_t,c,{items:0,selectedItem:1})}}function jt(t){let e;return{c(){e=h("Files")},m(t,n){d(t,e,n)},d(t){t&&p(e)}}}function kt(t){let e;return{c(){e=h("A modern file explorer that pushes the boundaries of the platform.")},m(t,n){d(t,e,n)},d(t){t&&p(e)}}}function Lt(t){let e,n,r,o,s;return{c(){e=m("span"),n=h("Download "),r=h(t[1]),o=x(),s=m("span"),s.textContent="Microsoft Store",y(e,"class","button-title"),y(s,"class","button-description")},m(t,c){d(t,e,c),$(e,n),$(e,r),d(t,o,c),d(t,s,c)},p(t,e){2&e&&b(r,t[1])},d(t){t&&p(e),t&&p(o),t&&p(s)}}}function Ot(t){let e,n,r,o,s;return o=new lt({props:{direction:"column",$$slots:{default:[Lt]},$$scope:{ctx:t}}}),{c(){e=g("svg"),n=g("path"),r=x(),P(o.$$.fragment),y(n,"d","M12.25 38.5H35.75C36.7165 38.5 37.5 39.2835 37.5 40.25C37.5 41.1682 36.7929 41.9212 35.8935 41.9942L35.75 42H12.25C11.2835 42 10.5 41.2165 10.5 40.25C10.5 39.3318 11.2071 38.5788 12.1065 38.5058L12.25 38.5H35.75H12.25ZM23.6065 6.2558L23.75 6.25C24.6682 6.25 25.4212 6.95711 25.4942 7.85647L25.5 8V29.333L30.2931 24.5407C30.9765 23.8573 32.0846 23.8573 32.768 24.5407C33.4514 25.2242 33.4514 26.3322 32.768 27.0156L24.9898 34.7938C24.3064 35.4772 23.1984 35.4772 22.515 34.7938L14.7368 27.0156C14.0534 26.3322 14.0534 25.2242 14.7368 24.5407C15.4202 23.8573 16.5282 23.8573 17.2117 24.5407L22 29.329V8C22 7.08183 22.7071 6.32881 23.6065 6.2558L23.75 6.25L23.6065 6.2558Z"),y(n,"fill","currentColor"),y(e,"xmlns","http://www.w3.org/2000/svg"),y(e,"width","20"),y(e,"height","20"),y(e,"viewBox","0 0 48 48"),y(e,"fill","none")},m(t,c){d(t,e,c),$(e,n),d(t,r,c),T(o,t,c),s=!0},p(t,e){const n={};66&e&&(n.$$scope={dirty:e,ctx:t}),o.$set(n)},i(t){s||(Z(o.$$.fragment,t),s=!0)},o(t){D(o.$$.fragment,t),s=!1},d(t){t&&p(e),t&&p(r),z(o,t)}}}function Ht(t){let e,n;return e=new lt({props:{gap:!0,align:"center",$$slots:{default:[Ot]},$$scope:{ctx:t}}}),{c(){P(e.$$.fragment)},m(t,r){T(e,t,r),n=!0},p(t,n){const r={};66&n&&(r.$$scope={dirty:n,ctx:t}),e.$set(r)},i(t){n||(Z(e.$$.fragment,t),n=!0)},o(t){D(e.$$.fragment,t),n=!1},d(t){z(e,t)}}}function Et(t){let e,n,r;return{c(){e=m("span"),e.textContent="GitHub",n=x(),r=m("span"),r.textContent="Files is open source!",y(e,"class","button-title"),y(r,"class","button-description")},m(t,o){d(t,e,o),d(t,n,o),d(t,r,o)},d(t){t&&p(e),t&&p(n),t&&p(r)}}}function Ft(t){let e,n,r,o,s;return o=new lt({props:{direction:"column",$$slots:{default:[Et]},$$scope:{ctx:t}}}),{c(){e=g("svg"),n=g("path"),r=x(),P(o.$$.fragment),y(n,"fill-rule","evenodd"),y(n,"fill","currentColor"),y(n,"d","M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"),y(e,"xmlns","http://www.w3.org/2000/svg"),y(e,"viewBox","0 0 16 16"),y(e,"width","18"),y(e,"height","18")},m(t,c){d(t,e,c),$(e,n),d(t,r,c),T(o,t,c),s=!0},p(t,e){const n={};64&e&&(n.$$scope={dirty:e,ctx:t}),o.$set(n)},i(t){s||(Z(o.$$.fragment,t),s=!0)},o(t){D(o.$$.fragment,t),s=!1},d(t){t&&p(e),t&&p(r),z(o,t)}}}function At(t){let e,n;return e=new lt({props:{gap:!0,align:"center",$$slots:{default:[Ft]},$$scope:{ctx:t}}}),{c(){P(e.$$.fragment)},m(t,r){T(e,t,r),n=!0},p(t,n){const r={};64&n&&(r.$$scope={dirty:n,ctx:t}),e.$set(r)},i(t){n||(Z(e.$$.fragment,t),n=!0)},o(t){D(e.$$.fragment,t),n=!1},d(t){z(e,t)}}}function It(t){let e,n,r,o;return e=new ht({props:{type:"primary",href:`ms-windows-store://pdp/?ProductId=${t[2]}`,custom:!0,$$slots:{default:[Ht]},$$scope:{ctx:t}}}),r=new ht({props:{href:t[3],target:"_blank",custom:!0,$$slots:{default:[At]},$$scope:{ctx:t}}}),{c(){P(e.$$.fragment),n=x(),P(r.$$.fragment)},m(t,s){T(e,t,s),d(t,n,s),T(r,t,s),o=!0},p(t,n){const o={};4&n&&(o.href=`ms-windows-store://pdp/?ProductId=${t[2]}`),66&n&&(o.$$scope={dirty:n,ctx:t}),e.$set(o);const s={};8&n&&(s.href=t[3]),64&n&&(s.$$scope={dirty:n,ctx:t}),r.$set(s)},i(t){o||(Z(e.$$.fragment,t),Z(r.$$.fragment,t),o=!0)},o(t){D(e.$$.fragment,t),D(r.$$.fragment,t),o=!1},d(t){z(e,t),t&&p(n),z(r,t)}}}function Nt(t){let e,n,r,o,s,c;return e=new nt({props:{$$slots:{default:[jt]},$$scope:{ctx:t}}}),r=new st({props:{$$slots:{default:[kt]},$$scope:{ctx:t}}}),s=new lt({props:{id:"hero-button-container",gap:!0,wrap:!0,$$slots:{default:[It]},$$scope:{ctx:t}}}),{c(){P(e.$$.fragment),n=x(),P(r.$$.fragment),o=x(),P(s.$$.fragment)},m(t,i){T(e,t,i),d(t,n,i),T(r,t,i),d(t,o,i),T(s,t,i),c=!0},p(t,n){const o={};64&n&&(o.$$scope={dirty:n,ctx:t}),e.$set(o);const c={};64&n&&(c.$$scope={dirty:n,ctx:t}),r.$set(c);const i={};78&n&&(i.$$scope={dirty:n,ctx:t}),s.$set(i)},i(t){c||(Z(e.$$.fragment,t),Z(r.$$.fragment,t),Z(s.$$.fragment,t),c=!0)},o(t){D(e.$$.fragment,t),D(r.$$.fragment,t),D(s.$$.fragment,t),c=!1},d(t){z(e,t),t&&p(n),z(r,t),t&&p(o),z(s,t)}}}function St(t){let e,n,r,o,s,c,i;return e=new lt({props:{direction:"column",id:"hero-left-container",$$slots:{default:[Nt]},$$scope:{ctx:t}}}),{c(){P(e.$$.fragment),n=x(),r=m("img"),s=x(),c=m("canvas"),y(r,"class","preview-image svelte-yhtanf"),y(r,"alt","Files preview"),r.src!==(o="https://i.imgur.com/CwHVFqL.png")&&y(r,"src","https://i.imgur.com/CwHVFqL.png"),y(c,"width","32"),y(c,"height","32"),y(c,"id","background-canvas"),y(c,"class","svelte-yhtanf")},m(o,l){T(e,o,l),d(o,n,l),d(o,r,l),d(o,s,l),d(o,c,l),t[4](c),i=!0},p(t,n){const r={};78&n&&(r.$$scope={dirty:n,ctx:t}),e.$set(r)},i(t){i||(Z(e.$$.fragment,t),i=!0)},o(t){D(e.$$.fragment,t),i=!1},d(o){z(e,o),o&&p(n),o&&p(r),o&&p(s),o&&p(c),t[4](null)}}}function Vt(t){let e,n,r,o;return e=new Mt({props:{selectedItem:0,items:[{name:"Home",href:"/"},{name:"Docs",href:"/",external:!0},{name:"Discord",href:"/",external:!0},{name:"GitHub",href:"/",external:!0}]}}),r=new lt({props:{id:"hero-inner-container",align:"center",gap:!0,$$slots:{default:[St]},$$scope:{ctx:t}}}),{c(){P(e.$$.fragment),n=x(),P(r.$$.fragment)},m(t,s){T(e,t,s),d(t,n,s),T(r,t,s),o=!0},p(t,e){const n={};79&e&&(n.$$scope={dirty:e,ctx:t}),r.$set(n)},i(t){o||(Z(e.$$.fragment,t),Z(r.$$.fragment,t),o=!0)},o(t){D(e.$$.fragment,t),D(r.$$.fragment,t),o=!1},d(t){z(e,t),t&&p(n),z(r,t)}}}function Bt(t){let e,n;return e=new bt({props:{id:"hero-section",$$slots:{default:[Vt]},$$scope:{ctx:t}}}),{c(){P(e.$$.fragment)},m(t,r){T(e,t,r),n=!0},p(t,[n]){const r={};79&n&&(r.$$scope={dirty:n,ctx:t}),e.$set(r)},i(t){n||(Z(e.$$.fragment,t),n=!0)},o(t){D(e.$$.fragment,t),n=!1},d(t){z(e,t)}}}function Zt(t,e,n){let r,o,s,c;i(t,W,(t=>n(5,r=t))),i(t,Y,(t=>n(2,o=t))),i(t,X,(t=>n(3,s=t)));let l="";return _((()=>{let t=0;const e=c.getContext("2d"),o=(t,n,r,o,s)=>{e.fillStyle=`rgb(${r}, ${o}, ${s})`,e.fillRect(t,n,1,1)},s=(t,e,n)=>Math.floor(192+64*Math.cos((t*t-e*e)/300+n)),i=(t,e,n)=>Math.floor(192+64*Math.sin((t*t*Math.cos(n/4)+e*e*Math.sin(n/3))/300)),u=(t,e,n)=>Math.floor(192+64*Math.sin(5*Math.sin(n/9)+((t-100)*(t-100)+(e-100)*(e-100))/1100));let a=()=>{for(let e=0;e<=35;e++)for(let n=0;n<=35;n++)o(e,n,s(e,n,t),i(e,n,t),u(e,n,t));t+=.05,window.requestAnimationFrame(a)};a(),(async()=>{n(1,l=await async function(t){return await fetch(t).then((t=>t.json())).then((t=>{if(t)return t.tag_name})).catch((t=>(console.error(t),"")))}(r))})()})),[c,l,o,s,function(t){M[t?"unshift":"push"]((()=>{c=t,n(0,c)}))}]}return new class extends J{constructor(t){super(),R(this,t,Zt,Bt,c,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
