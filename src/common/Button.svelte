<script lang="ts">
	import { goto } from "$app/navigation";

	export let type: ButtonType = "secondary";
	export let custom = false;
	export let id: string;
	export let href: string;
	export let target = undefined;
	export let disabled: boolean;

	type ButtonType = "primary" | "secondary";
</script>

{#if !href}
	<button class="type-{type}" {id} {disabled}>
		{#if custom}
			<slot />
		{:else}
			<span><slot /></span>
		{/if}
	</button>
{:else}
	<button
		on:click={() => (target === "_blank" ? window.open(href) : goto(href))}
		class="type-{type}"
		{id}
		{disabled}
	>
		{#if custom}
			<slot />
		{:else}
			<span><slot /></span>
		{/if}
	</button>
{/if}

<style lang="scss">
	button {
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

		&.type- {
			&secondary {
				color: var(--text-primary);
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

			&primary {
				color: #fff;
				background-color: var(--accent);
				box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.22);

				&:hover {
					background-color: var(--accent-hover);
				}

				&:active {
					background-color: var(--accent-active);
				}
			}
		}

		&[disabled] {
			cursor: not-allowed;
			opacity: 0.6;
		}
	}
</style>