<script lang="ts">
  export let center = false;
  export let size: TitleSize = 1;

  type TitleSize = 1 | 2 | 3
</script>

<!-- for some reason svelte doesn't have dynamic tag support yet -->
{#if size === 1}
  <h1 class="title size={size}" class:text-center={center}>
    <slot />
  </h1>
{:else if size === 2}
  <h2 class="title size={size}" class:text-center={center}>
    <slot />
  </h2>
{:else if size === 3}
  <h3 class="title size={size}" class:text-center={center}>
    <slot />
  </h3>
{/if}

<style lang="scss">
	.title {
		font-weight: 800;
		margin: 0;
		color: var(--text-primary);

		&.text-center { text-align: center }

		&.size- {
			&1 {
				font-size: 72px;
				line-height: 1.4;
			}

			&2 {
				font-size: 64px;
				line-height: 1.3;
			}

			&3 {
				font-size: 56px;
				line-height: 1.2;
			}
		}
	}
</style>