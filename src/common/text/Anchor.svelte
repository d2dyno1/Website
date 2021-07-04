<script lang="ts">
	export let href: string
	export let target: string
</script>

<a class="anchor" {href} rel={target === '_blank' ? 'noreferrer noopener' : ''}
   target={target === '_blank' ? target : ''}>
	<slot/>
</a>

<style lang="scss">
	@use "static/colors";

	.anchor {
		font-weight: 500;
		text-decoration: none;
		color: colors.$accent;

		&:hover {
			text-decoration: underline;
		}
	}
</style>