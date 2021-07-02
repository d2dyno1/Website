<script lang="ts">
	import type { ButtonType } from "../utilTypes"

	export let type: ButtonType = "secondary"
	export let custom = false
	export let id: string
	export let href: string
	export let target = undefined
	export let disabled: boolean
	export let center = false
</script>

{#if !href}
	<button class="button {type}" {id} {disabled} type="button">
		{#if custom}
			<slot/>
		{:else}
			<span><slot/></span>
		{/if}
	</button>
{:else}
	<a class="button {type}" type="button" role="button"
	   target={target === '_blank' ? target : "_self"}
	   rel={target === '_blank' ? 'noreferrer noopener' : undefined}
	   {href} {id} {disabled}>
		{#if custom}
			<slot/>
		{:else}
			<span><slot/></span>
		{/if}
	</a>
{/if}

<style lang="scss">
	@use "static/colors";

	.button {
		font-size: 14px;
		font-weight: 400;
		line-height: 1.2em;

		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;

		max-width: 100%;
		height: 2.75em;
		padding: 1.6em 1.4em 1.6em .5em;

		cursor: pointer;
		user-select: none;

		transition: 100ms linear;
		text-align: left;
		text-decoration: none;
		border: none;
		border-radius: 4px;
		outline: none;

		span {
			display: flex;
			flex-direction: column;
		}

		&.secondary {
			color: colors.$light-text-primary;
			background: colors.$light-background-secondary;
			box-shadow: inset 0 0 0 1px hsla(0, 0%, 0%, 0.06), inset 0 -1px 0 hsla(0, 0%, 0%, 0.1);

			&:hover {
				background: darken(colors.$light-background-secondary, 10%);
			}

			&:active {
				color: hsla(0, 0%, 0%, 0.62);
				background: darken(colors.$light-background-secondary, 20%);
			}
		}

		&.primary {
			color: colors.$dark-text-primary;
			background-color: colors.$accent;
			box-shadow: inset 0 -1px 0 hsla(0, 0%, 0%, 0.22);

			&:hover { background-color: colors.$accent-hover }

			&:active { background-color: colors.$accent-active }
		}

		&[disabled] {
			cursor: not-allowed;
			opacity: 0.6;
		}
	}
</style>