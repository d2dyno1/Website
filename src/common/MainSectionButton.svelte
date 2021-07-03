<script lang="ts">
	import Button from "./Button.svelte"
	import type { ButtonType } from "src/utilTypes"

	export let title: string
	export let description: string
	export let href: string
	export let type: ButtonType
</script>

<Button custom {href} target="_blank" {type}>
	<div class="button">
		<slot/>

		<div class="button-labels">
			<span class="button-title">{title}</span>
			<span class="button-description">{description}</span>
		</div>
	</div>
</Button>

<style lang="scss">
	@use "static/mixins";

	.button {
		@include mixins.flex($align: center, $gap: true)
	}

	.button-labels {
		@include mixins.flex($direction: column)
	}

	.button-title {
		font-size: 1.1em;
		font-weight: 600;
	}

	.button-description {
		font-size: .9em;
	}

</style>