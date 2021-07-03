<script lang="ts">
	// Fetch contributors
	import type { Contributor } from "../utilTypes"
	import { getContributors } from "../routes/fetchHomepageData"
	import AvatarIcon from "@fluentui/svg-icons/icons/person_32_filled.svg?raw"

	export let pageNumber = 0

	let contributors: Promise<Contributor[]> = getContributors(pageNumber + 1)
</script>

<div class="contributors-row">
	{#await contributors}
		<div class="contributor-card">
			<div class="contributor-avatar" aria-hidden="true">{@html AvatarIcon}</div>
			<div class="contributor-info">
				<h5>Loading...</h5>
				<span>Loading contributions...</span>
			</div>
		</div>
	{:then contributorsLine}
		{#each contributorsLine as contributor}
			{#if !contributor.login.endsWith("[bot]")}
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
			{/if}
		{/each}
	{:catch error}
		<div class="contributor-card">
			<div class="contributor-avatar-error" aria-hidden="true">{@html AvatarIcon}</div>
			<div class="contributor-info">
				<h5>Error!</h5>
				<span>Failed to load contributions.</span>
			</div>
		</div>
	{/await}
</div>

<style lang="scss">
	@use "static/colors";
	@use "static/mixins";

	.contributors-row {
		margin-bottom: 10px;
		white-space: nowrap;

		&:nth-child(odd) {
			float: right;
			animation: contributors-scroller-right 60.5s linear infinite;

			@media (prefers-reduced-motion) {
				animation: contributors-scroller-right 240s linear infinite;
			}
		}

		&:nth-child(even) {
			float: left;
			animation: contributors-scroller-left 60.5s linear infinite;

			@media (prefers-reduced-motion) {
				animation: contributors-scroller-left 240s linear infinite;
			}
		}

		&:last-child { margin: 0 }
	}

	.contributor-card {
		@include mixins.flex($inline: true, $align: center);

		margin-right: 10px;
		padding: 1rem;
		border-radius: 1em;
		background-color: hsla(0, 0%, 100%, 0.7);
		box-shadow: inset 0 0 0 3px hsla(0, 0%, 0%, 0.06), inset 0 -8px 0 hsla(0, 0%, 0%, 0.1);
	}

	.contributor-avatar {
		width: 2rem;
		min-height: 2rem;
		border-radius: 50%;
		object-fit: cover;

		&-error {
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
			font: {
				size: 1rem;
				weight: 600;
			}
			margin: 0;
			color: colors.$accent;

			&:hover {
				cursor: pointer;
				text-decoration: underline;
			}
		}
	}

	@keyframes contributors-scroller-right {
		to {
			transform: translateX(50%);
		}
	}

	@keyframes contributors-scroller-left {
		to {
			transform: translateX(-50%);
		}
	}
</style>