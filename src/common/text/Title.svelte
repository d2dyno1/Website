<script lang="ts">
	export let center = false;
	export let size: TitleSize = 1;

	type TitleSize = 1 | 2 | 3 | 4 | 5 | 6
</script>

<!-- for some reason svelte doesn't have dynamic tag support yet -->
{#if size === 1}
	<h1 class="title" class:text-center={center}>
		<slot />
	</h1>
{:else if size === 2}
	<h2 class="title" class:text-center={center}>
		<slot />
	</h2>
{:else if size === 3}
	<h3 class="title" class:text-center={center}>
		<slot />
	</h3>
{:else if size === 4}
	<h4 class="title" class:text-center={center}>
		<slot />
	</h4>
{:else if size === 5}
	<h5 class="title" class:text-center={center}>
		<slot />
	</h5>
{:else if size === 6}
	<h6 class="title" class:text-center={center}>
		<slot />
	</h6>
{/if}

<style lang="scss">
	.title {
		font-weight: bolder;
		margin: 0;
		color: var(--text-primary);

		&.text-center { text-align: center }
	}

	h1 {
		font-size: 4.5em;
		line-height: 1.4;
	}

	h2 {
		font-size: 4em;
		line-height: 1.3;
	}

	h3 {
		font-size: 3.5em;
		line-height: 1.2;
	}

	h4 {
		font-size: 3em;
		line-height: 1.1;
	}

	h5 {
		font-size: 2.5em;
		line-height: 1;
	}

	h6 {
		font-size: 2em;
		line-height: .9;
	}
</style>