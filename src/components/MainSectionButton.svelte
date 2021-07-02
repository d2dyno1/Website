<script lang="ts">
	import Button from "../common/Button.svelte"
	import Flex from "../common/Flex.svelte"
	import type { ButtonType } from "../utilTypes"

	export let title: string
	export let description: string
	export let href: string
	export let type: ButtonType
</script>

<Button custom {href} target="_blank" {type}>
	<Flex align="center" gap>
		<slot/>

		<Flex direction="column">
			<span class="button-title">{title}</span>
			<span class="button-description">{description}</span>
		</Flex>
	</Flex>
</Button>

<style lang="scss">
	.button-title {
		font-size: 1.1em;
		font-weight: 600;
	}

	.button-description {
		font-size: .9em;
	}

</style>