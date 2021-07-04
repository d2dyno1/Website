<script lang="ts">
	import type { Contributor } from "../utilTypes"
	import AvatarIcon from "@fluentui/svg-icons/icons/person_32_filled.svg?raw"

	export let contributor: Contributor
	export let loaded = true
	export let error = false
</script>

{#if loaded}
	<a href="https://github.com/{contributor.login}" target="_blank" class="contributor-card">
		<!--suppress HtmlUnknownTarget -->
		<img class="contributor-avatar" src={contributor.avatar_url} alt="{contributor.login} avatar"/>
		<div class="contributor-info">
			<h5>{contributor.login}</h5>
			<span>
				{contributor.contributions} Contribution{contributor.contributions > 1 ? "s" : ""}
			</span>
		</div>
	</a>
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

	$card-background: darken(white, 5%);
	$shadow-color: rgba(0, 0, 0, 0.04);
	$shadow-color-hover: rgba(0, 0, 0, 0.14);

	.contributor-card {
		@include mixins.flex($inline: true, $align: center);
		margin-right: 10px;
		padding: 1rem;
		transition: transform 100ms ease-in, box-shadow 100ms ease-in;
		text-decoration: none;
		border: 1px solid rgba(0, 0, 0, 0.0578);
		border-radius: 1em;
		background-color: $card-background;
		box-shadow: 0 2 4 10 $shadow-color;

		&:hover, &:active, &:focus, &:focus-visible {
			transform: translateY(-3px);
			box-shadow: 0 2px 4px $shadow-color-hover;
		}
	}

	.contributor-avatar {
		width: 2rem;
		min-height: 2rem;
		transition: transform 100ms ease-in, box-shadow 100ms ease-in;
		border-radius: 50%;

		&.error { fill: darken(red, 15%) }
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
			}
		}
	}
</style>