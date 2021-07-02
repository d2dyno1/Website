<script>
	export let center = false
</script>

<p class="subtext" class:text-center={center}>
	<slot/>
</p>

<style lang="scss">
	@use "static/colors";

	.subtext {
		font: {
			weight: 500;
			size: 16px;
		}
		line-height: 1.4;
		margin: 1em 0;
		color: colors.$light-text-secondary;

		&.text-center { text-align: center }
	}
</style>