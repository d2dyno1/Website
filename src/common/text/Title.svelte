<script lang="ts">
	export let center = false
	export let size: TitleSize = 1
	export let bold: FontWeight = "bolder"
	export let style = ""

	type TitleSize = 1 | 2 | 3 | 4 | 5 | 6
	type FontWeight = "normal" | "bold" | "bolder" | "semibold"
</script>

<!-- for some reason svelte doesn't have dynamic tag support yet -->
{#if size === 1}
	<h1 class="title {bold}" class:center {style}>
		<slot/>
	</h1>
{:else if size === 2}
	<h2 class="title {bold}" class:center {style}>
		<slot/>
	</h2>
{:else if size === 3}
	<h3 class="title {bold}" class:center {style}>
		<slot/>
	</h3>
{:else if size === 4}
	<h4 class="title {bold}" class:center {style}>
		<slot/>
	</h4>
{:else if size === 5}
	<h5 class="title {bold}" class:center {style}>
		<slot/>
	</h5>
{:else if size === 6}
	<h6 class="title {bold}" class:center {style}>
		<slot/>
	</h6>
{/if}

<style lang="scss">
	.title {
		margin: 0;
		color: var(--text-primary);
		--text-opsz: 32;

		&.center { text-align: center }

		&.normal { font-weight: normal }

		&.bold { font-weight: bold }

		&.semibold { font-weight: 600 }

		&.bolder { font-weight: bolder }
	}

	h1 {
		font-size: 4.5em;
		line-height: 1;
	}

	h2 {
		font-size: 4em;
	}

	h3 {
		font-size: 3.5em;
	}

	h4 {
		font-size: 3em;
	}

	h5 {
		font-size: 2.5em;
	}

	h6 {
		font-size: 2em;
	}
</style>