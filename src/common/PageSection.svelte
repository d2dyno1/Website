<script lang="ts">
  export let id: string;
</script>

<section class="page-section" {id}>
  <slot />
</section>

<style lang="scss">
	.page-section {
		position: relative;
		padding: 72px;
	}
</style>