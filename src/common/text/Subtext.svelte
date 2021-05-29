<script lang="ts">
  export let center = false;
</script>

<p class="subtext" class:text-center={center}>
  <slot />
</p>

<style lang="scss">
	.subtext {
		font: {
			weight: 500;
			size: 16px;
		}
		line-height: 1.4;
		margin: 0;
		color: #6f6f6f;

		&.text-center { text-align: center }
	}
</style>