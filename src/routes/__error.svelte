<script context="module">
	export function load({error, status}) {
		return {
			props: {
				status: status,
				message: error.message
			}
		}
	}
</script>


<script lang="ts">
	import Title from "../common/text/Title.svelte"

	export let status: string
	export let message: string
</script>

<svelte:head>
	<title>Error: {status}</title>
</svelte:head>

<div id="error-page">
	<Title bold="semibold" size={1} style="margin: 1rem 0;">Error: {status}</Title>
	<pre id="error-message">{message}</pre>
</div>

<style lang="scss">
	@use "static/mixins";
	@use "static/colors";

	#error-page {
		@include mixins.flex($direction: column, $align: center);
		font-weight: 600;
		color: colors.$light-text-primary;

		#error-message {
			font-size: 1.2rem;
			padding: 0;
			color: colors.$light-text-primary;
			background: colors.$light-background-primary;
		}
	}
</style>