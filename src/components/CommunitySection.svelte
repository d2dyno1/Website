<script lang="ts">
	import Title from "../common/text/Title.svelte"
	import Anchor from "../common/text/Anchor.svelte"
	import ContributorsRow from "./ContributorsRow.svelte"
</script>

<section id="community-section">
	<div id="community-section-inner">
		<Title bold="semibold" center size={3}>Community Driven</Title>
		<p class="subtext-center">
			Files is
			<Anchor href="https://github.com/files-community/Files/blob/main/LICENSE" target="_blank">
				free and open source
			</Anchor>
			software maintained and designed by the community.
		</p>
		<div class="contributors-container">
			{#each Array(3) as _, row}
				<ContributorsRow pageNumber={row}/>
			{/each}
		</div>
	</div>
</section>

<style lang="scss">
	@use "static/mixins";
	@use "static/colors";

	#community-section {
		@include mixins.blur-edges(colors.$light-background-primary);
	}

	#community-section-inner {
		@include mixins.flex($direction: column, $align: center, $justify: center);
	}

	.contributors-container {
		position: relative;
		overflow: hidden;
		max-width: 1800px;
	}

	@media screen and (min-width: 1800px) {
		.contributors-container {
			&::before,
			&::after {
				position: absolute;
				z-index: 1;
				top: 0;
				bottom: 0;
				width: 100px;
				content: "";
			}

			&::before {
				background-image: linear-gradient(90deg, white, transparent);
			}

			&::after {
				right: 0;
				background-image: linear-gradient(90deg, transparent, white);
			}
		}
	}
</style>