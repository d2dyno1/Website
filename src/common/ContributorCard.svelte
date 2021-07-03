<script lang="ts">
	import type { Contributor } from "../utilTypes"
	import AvatarIcon from "@fluentui/svg-icons/icons/person_32_filled.svg?raw"

	export let contributor: Contributor
	export let loaded = true
	export let error = false
</script>

{#if loaded}
	<div class="contributor-card">
		<!--suppress HtmlUnknownTarget -->
		<img class="contributor-avatar" src={contributor.avatar_url} alt="{contributor.login} avatar"/>
		<div class="contributor-info"
		     on:click={() => window.open(`https://github.com/${contributor.login}`)}>
			<h5>{contributor.login}</h5>
			<span>
				{contributor.contributions} Contribution{contributor.contributions > 1 ? "s" : ""}
			</span>
		</div>
	</div>
{:else}
	<div class="contributor-card">
		<div class="contributor-avatar" class:error aria-hidden="true">{@html AvatarIcon}</div>
		<div class="contributor-info">
			<h5>{!error ? "Loading..." : "Error!"}</h5>
			<span>{!error ? "Loading contributions..." : "Failed to load contributions."}</span>
		</div>
	</div>
{/if}

<style lang="scss">
	@use "static/colors";
	@use "static/mixins";

	$card-background: hsla(0, 0%, 100%, 0.7);
	$shadow-color-top: hsla(0, 0%, 0%, 0.1);
	$shadow-color-bottom: hsla(0, 0%, 0%, 0.2);

	.contributor-card {
		@include mixins.flex($inline: true, $align: center);
		margin-right: 10px;
		padding: 1rem;
		transition: transform 100ms ease-in, box-shadow 100ms ease-in;
		border-radius: 1em;
		background-color: $card-background;
		box-shadow: inset 0 0 0 4px $shadow-color-top, inset 0 -8px 0 $shadow-color-bottom;

		&:hover, &:active, &:focus, &:focus-visible {
			transform: translateY(6px);
			box-shadow: inset 0 0 0 4px $shadow-color-top;
		}
	}

	.contributor-avatar {
		width: 2rem;
		min-height: 2rem;
		border-radius: 50%;
		object-fit: cover;

		&.error {
			fill: darken(red, 15%);
		}
	}

	.contributor-info {
		margin-left: 10px;

		span {
			font: {
				size: .8rem;
				weight: 500;
			}
			color: colors.$light-text-primary;

			&:hover {
				cursor: pointer;
			}
		}

		h5 {
			margin: 0;
			font: {
				size: 1rem;
				weight: 600;
			}
			color: colors.$accent;
			--text-opsz: 32;

			&:hover {
				cursor: pointer;
				text-decoration: underline;
				text-underline-position: from-font;
			}
		}
	}
</style>