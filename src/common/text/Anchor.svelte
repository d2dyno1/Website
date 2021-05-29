<script lang="ts">
  export let href: string;
  export let target: string;
</script>

<a class="anchor" {href} rel={target === '_blank' ? 'noreferrer noopener' : undefined}
   target={target === '_blank' ? target : undefined}>
  <slot />
</a>

<style lang="scss">
	.anchor {
		font-weight: 500;
		text-decoration: none;
		color: #0078d4;

		&:hover {
			text-decoration: underline;
		}
	}
</style>