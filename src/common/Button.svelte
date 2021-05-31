<script lang="ts">
	import type { ButtonType } from "../utilTypes";

	export let type: ButtonType = "secondary";
	export let custom = false;
	export let id: string;
	export let href: string;
	export let target = undefined;
	export let disabled: boolean;
</script>

{#if !href}
	<button class="button {type}" {id} {disabled}>
		{#if custom}
			<slot />
		{:else}
			<span><slot /></span>
		{/if}
	</button>
{:else}
	<a class="button {type}" type="button" role="button"
	   target={target === '_blank' ? target : undefined}
	   rel={target === '_blank' ? 'noreferrer noopener' : undefined}
	   {href} {id} {disabled}>
		{#if custom}
			<slot />
		{:else}
			<span><slot /></span>
		{/if}
	</a>
{/if}

<style lang="scss">
	@use "static/global" as styles;

	.button {
		font-size: 14px;
		font-weight: 400;
		line-height: 20px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		max-width: 100%;
		height: 32px;
		padding: 0 10px;
		cursor: pointer;
		user-select: none;
		transition: 100ms linear;
		text-align: center;
		text-decoration: none;
		border: none;
		border-radius: 4px;
		outline: none;

		span {
			display: flex;
			flex-direction: column;
		}

		&.secondary {
			color: #141414;
			background-color: rgba(255, 255, 255, 0.7);
			box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.059), inset 0 -1px 0 rgba(0, 0, 0, 0.102);

			&:hover {
				background-color: rgba(255, 255, 255, 0.5);
			}

			&:active {
				color: rgba(0, 0, 0, 0.62);
				background-color: rgba(255, 255, 255, 0.3);
			}
		}

		&.primary {
			color: #fff;
			background-color: #0078d4;
			box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.22);

			&:hover { background-color: #005ca3 }

			&:active { background-color: #006bbd }
		}

		&[disabled] {
			cursor: not-allowed;
			opacity: 0.6;
		}
	}
</style>