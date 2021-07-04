<script lang="ts">
	// Fetch contributors
	import type { Contributor } from "../utilTypes"
	import { getContributors } from "../routes/fetchHomepageData"
	import ContributorCard from "../common/ContributorCard.svelte"

	export let pageNumber = 0

	let contributors: Promise<Contributor[]> = getContributors(pageNumber + 1)
</script>

<div class="contributors-row">
	{#await contributors}
		<ContributorCard loaded={false}/>
	{:then contributorsLine}
		{#each contributorsLine.reverse() as contributor}
			{#if !contributor.login.endsWith("[bot]")}
				<ContributorCard {contributor}/>
			{/if}
		{/each}
	{:catch error}
		<ContributorCard loaded={false} error/>
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