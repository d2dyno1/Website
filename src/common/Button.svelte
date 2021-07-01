<script lang="ts">
	import type { ButtonType } from "../utilTypes"

	export let type: ButtonType = "secondary"
	export let custom = false
	export let id: string
	export let href: string
	export let target = undefined
	export let disabled: boolean
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
	@use "static/global" as styles;

	.button {
		font-size: 14px;
		font-weight: 400;
		line-height: 1.2em;

		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;

		max-width: 100%;
		height: 2.75em;
		padding: 0 .75em 0 .5em;

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
			color: hsl(0, 0%, 8%);
			background-color: hsla(0, 0%, 100%, 0.7);
			box-shadow: inset 0 0 0 1px hsla(0, 0%, 0%, 0.06), inset 0 -1px 0 hsla(0, 0%, 0%, 0.1);

			&:hover {
				background-color: hsla(0, 0%, 100%, 0.5);
			}

			&:active {
				color: hsla(0, 0%, 0%, 0.62);
				background-color: hsla(0, 0%, 100%, 0.3);
			}
		}

		&.primary {
			color: hsl(0, 0%, 100%);
			background-color: hsl(206, 100%, 42%);
			box-shadow: inset 0 -1px 0 hsla(0, 0%, 0%, 0.22);

			&:hover { background-color: hsl(206, 100%, 32%) }

			&:active { background-color: hsl(206, 100%, 37%) }
		}

		&[disabled] {
			cursor: not-allowed;
			opacity: 0.6;
		}
	}
</style>