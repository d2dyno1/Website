<script lang="ts">
  import { onMount } from "svelte";
  import { org, repo, storeId } from "../stores";
  import Flex from "../common/Flex.svelte";
  import Navbar from "../components/Navbar.svelte";
  import AppSkeleton from "../components/FilesApp.svelte";
  import Title from "../common/text/Title.svelte";
  import Subtext from "../common/text/Subtext.svelte";
  import Button from "../common/Button.svelte";
  import PageSection from "../common/PageSection.svelte";
  import Anchor from "../common/text/Anchor.svelte";
  import { getReleaseVersion } from "./fetchHomepageData";
  import ContributorsRow from "../components/ContributorsRow.svelte";

  let canvas: HTMLCanvasElement;
  // Fetch our release version
  let version = getReleaseVersion(`https://api.github.com/repos/${ org }/${ repo }/releases/latest`);

  onMount(async () => {
    let time = 0;

    const red = (x, y, t) => Math.floor(192 + 64 * Math.cos((x * x - y * y) / 300 + t));
    const green = (x, y, t) =>
      Math.floor(192 + 64 * Math.sin((x * x * Math.cos(t / 4) + y * y * Math.sin(t / 3)) / 300));
    const blue = (x, y, t) =>
      Math.floor(
        192 +
        64 *
        Math.sin(5 * Math.sin(t / 9) + ((x - 100) * (x - 100) + (y - 100) * (y - 100)) / 1100)
      );

    const run = () => {
      // Canvas
      const context = canvas.getContext("2d");

      for (let x = 0; x <= 35; x++) {
        for (let y = 0; y <= 35; y++) {
          context.fillStyle = `rgb(${ red(x, y, time) }, ${ green(x, y, time) }, ${ blue(x, y, time) })`;
          context.fillRect(x, y, 1, 1);
        }
      }
      time += 0.05;
      window.requestAnimationFrame(run);
    };
    run();
  });
</script>

<svelte:head><title>Files</title></svelte:head>

<!-- temporary thing to test theming. once a proper theme system is added this can be removed-->
<svelte:body class="theme-light" />

<Navbar selectedItem={0} />
<PageSection id="hero-section">
  <Flex align="center" gap id="hero-inner-container">
    <Flex direction="column" id="hero-left-container">
      <Title>Files</Title>
      <Subtext>A modern file explorer that pushes the boundaries of the platform.</Subtext>

      <Flex gap id="hero-button-container" wrap>
        <Button custom href="ms-windows-store://pdp/?ProductId={storeId}" type="primary">
          <Flex align="center" gap>
            <img alt="download button" src="static/icons/downloadButton.svg" />

            <Flex direction="column">
              {#await version}
                <span class="button-title">Loading latest version...</span>
                <span class="button-description">Microsoft Store</span>
              {:then githubVersion}
                <span class="button-title">Download {githubVersion}</span>
                <span class="button-description">Microsoft Store</span>
              {:catch error}
                <span class="button-title">Error!</span>
                <span class="button-description">Failed to load latest version.</span>
              {/await}
            </Flex>
          </Flex>
        </Button>

        <Button custom href="https://github.com/{org}/{repo}/" target="_blank">
          <Flex align="center" gap>
            <img alt="github repo button" src="static/icons/githubButton.svg" />

            <Flex direction="column">
              <span class="button-title">GitHub</span>
              <span class="button-description">Files is open source!</span>
            </Flex>
          </Flex>
        </Button>
      </Flex>
    </Flex>

    <AppSkeleton />
  </Flex>
  <canvas bind:this={canvas} height="32" id="background-canvas" width="32"></canvas>
</PageSection>
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
      <ContributorsRow pageNumber={1} />
      <ContributorsRow pageNumber={2} />
      <ContributorsRow pageNumber={3} />
    </div>
  </Flex>
</PageSection>

<style lang="scss">
	:global {
		#hero-section {
			z-index: 1;
			display: flex;
			overflow: hidden;
			flex-direction: column;
			justify-content: center;
			height: 100vh;
			min-height: 724px;
			max-height: 1000px;
			padding: 32px 72px;
			background: var(--background-secondary);
		}

		#hero-inner-container .button {
			line-height: 1.4;
			justify-content: flex-start;
			min-width: 150px;
			height: 45px;
			padding: 0 12px;
			text-align: left;

			.button-title {
				font-size: 12px;
				font-weight: 600;
			}

			.button-description {
				font-size: 10px;
				font-weight: 400;
			}
		}

		#hero-inner-container,
		#hero-left-container {
			flex: 1 1 auto;
		}

		#hero-button-container {
			margin-top: 24px;
		}

		#community-section {
			overflow: hidden;
			background: var(--background-primary);

			.subtext {
				margin-top: 4px;
				margin-bottom: 24px;
			}
		}
	}

	#background-canvas {
		position: absolute;
		z-index: -1;
		right: 0;
		bottom: 0;
		width: 100vh;
		height: 100vh;
		pointer-events: none;
		mask: radial-gradient(at bottom right, #000, transparent 70%);
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
				background-image: linear-gradient(90deg, var(--background-primary), transparent);
			}

			&::after {
				right: 0;
				background-image: linear-gradient(90deg, transparent, var(--background-primary));
			}
		}
	}

	:global(.theme-dark #background-canvas) {
		opacity: 0.5;
	}

	:global {
		.acrylic-material {
			overflow: hidden;
			backdrop-filter: blur(60px) saturate(5);
		}

		.acrylic-material::before {
			position: absolute;
			z-index: -1;
			width: 100%;
			height: 100%;
			content: "";
			opacity: 0.8;
			background-blend-mode: normal, color, luminosity;
		}

		.acrylic-material::before {
			background: var(--acrylic-layer);
		}
	}
</style>