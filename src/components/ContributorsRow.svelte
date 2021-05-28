<script lang="ts">
  // Fetch contributors
  import { org, repo } from "../stores";
  import type { Contributor } from "../utilTypes";
  import { getContributors } from "../routes/fetchHomepageData";

  export let pageNumber = 1;

  let contributors: Promise<Contributor[]> = getContributors(
    `https://api.github.com/repos/${ org }/${ repo }/contributors?per_page=35&page=${ pageNumber }`
  );
</script>

<div class="contributors-row">
  {#await contributors}
    <div class="contributor-card">
      <i class="contributor-avatar ms-Icon ms-Icon--CloudDownload" aria-hidden="true"></i>
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
          <img class="contributor-avatar" src={contributor.avatar_url} alt="{contributor.login} avatar" />
          <div class="contributor-info">
            <h5>{contributor.login}</h5>
            <span>
              {contributor.contributions}
              Contribution{contributor.contributions > 1 ? "s" : ""}
            </span>
          </div>
        </div>
      {/if}
    {/each}
  {:catch error}
    <div class="contributor-card">
      <i class="contributor-avatar ms-Icon ms-Icon--Error" aria-hidden="true"></i>
      <div class="contributor-info">
        <h5>Error!</h5>
        <span>Failed to load contributions.</span>
      </div>
    </div>
  {/await}
</div>

<style lang="scss">
	.contributors-row {
		margin-bottom: 10px;
		white-space: nowrap;

		&:nth-child(odd) {
			float: right;
			animation: contributors-scroller-right 60.5s linear infinite;
		}

		&:nth-child(even) {
			float: left;
			animation: contributors-scroller-left 60.5s linear infinite;
		}

		&:last-child {
			margin: 0;
		}
	}

	.contributor-card {
		display: inline-flex;
		align-items: center;
		margin-right: 10px;
		padding: 16px;
		border-radius: 8px;
		background-color: rgba(255, 255, 255, 0.7);
		box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.059), inset 0 -1px 0 rgba(0, 0, 0, 0.102);
	}

	.contributor-avatar {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		object-fit: cover;
	}

	.contributor-info {
		font-size: 12px;
		margin-left: 10px;
		color: var(--text-secondary);

		h5 {
			font: {
				size: 14px;
				weight: 600;
			}
			margin: 0;
			color: var(--text-primary);
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