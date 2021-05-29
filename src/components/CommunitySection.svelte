<script lang="ts">
	import PageSection from "../common/PageSection.svelte"
	import Flex from "../common/Flex.svelte"
	import Title from "../common/text/Title.svelte"
	import Subtext from "../common/text/Subtext.svelte"
	import Anchor from "../common/text/Anchor.svelte"
	import ContributorsRow from "./ContributorsRow.svelte"
</script>

<PageSection id="community-section">
	<Flex align="center" direction="column" id="community-section-inner" justify="center">
		<Title center size={3}>Community Driven</Title>
		<Subtext center>
			Files is
			<Anchor href="https://github.com/files-community/Files/blob/main/LICENSE" target="_blank"
			>free and open source
			</Anchor>
			software maintained and designed by the community.
		</Subtext>
		<div class="contributors-container">
			<ContributorsRow pageNumber={1}/>
			<ContributorsRow pageNumber={2}/>
			<ContributorsRow pageNumber={3}/>
		</div>
	</Flex>
</PageSection>

<style lang="scss">
	.contributors-container {
		position: relative;
		overflow: hidden;
		max-width: 1800px;
	}

	#community-section {
		overflow: hidden;
		background: var(--background-primary);

		.subtext {
			margin-top: 4px;
			margin-bottom: 24px;
		}
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
				background-image: linear-gradient(90deg, var(--background-primary), transparent);
			}

			&::after {
				right: 0;
				background-image: linear-gradient(90deg, transparent, var(--background-primary));
			}
		}
	}
</style>