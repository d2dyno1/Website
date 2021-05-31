<script lang="ts">
	import Button from "../common/Button.svelte";
	import Flex from "../common/Flex.svelte";
	import type { ButtonType } from "../utilTypes";

	export let title: string;
	export let description: string;
	export let href: string;
	export let type: ButtonType;
</script>

<Button custom {href} target="_blank" {type}>
	<Flex align="center" gap>
		<slot />

		<Flex direction="column">
			<a class="button-title">{title}</a>
			<a class="button-description">{description}</a>
		</Flex>
	</Flex>
</Button>

<style lang="scss">
	.button {
		line-height: 1.4;
		justify-content: flex-start;
		min-width: 150px;
		height: 45px;
		padding: 0 12px;
		text-align: left;
	}

	.button-title {
		font-size: 12px;
		font-weight: 600;
	}

	.button-description {
		font-size: 10px;
		font-weight: 400;
	}
</style>