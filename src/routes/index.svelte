<script lang="ts">
  import { onMount } from "svelte";
  import { org, repo, storeId } from "../stores";
  import Flex from "../common/Flex.svelte";
  import Navbar from "../Navbar.svelte";
  import AppSkeleton from "../FilesApp.svelte";
  import Title from "../common/text/Title.svelte";
  import Subtext from "../common/text/Subtext.svelte";
  import Button from "../common/Button.svelte";
  import PageSection from "../common/PageSection.svelte";
  import Anchor from "../common/text/Anchor.svelte";
  import type { Item } from "../utilTypes";

  type Contributor = {
    login: string;
    avatar_url: string;
    contributions: number;
  };

  let canvas: HTMLCanvasElement;
  let version = "";
  let contributors1: Contributor[] = [];
  let contributors2: Contributor[] = [];
  let contributors3: Contributor[] = [];
  const items: Item[] = [
    {
      name: "Home",
      href: "/"
    },
    {
      name: "Docs",
      href: "/",
      external: true
    },
    {
      name: "Discord",
      href: "/",
      external: true
    },
    {
      name: "GitHub",
      href: "/",
      external: true
    }
  ];

  const getReleaseVersion = async (endpoint: string) =>
    await fetch(endpoint)
      .then((result) => result.json())
      .then((result: { tag_name: string }) => {
        if (result) return result.tag_name;
      })
      .catch((err) => {
        console.error(err);
        return "";
      });

  const getContributors = async (endpoint: string) =>
    await fetch(endpoint)
      .then((result) => result.json())
      .then((result) => result)
      .catch((err) => {
        console.error(err);
        return "";
      });

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

    // Fetch our release version
    version = await getReleaseVersion(
      `https://api.github.com/repos/${ org }/${ repo }/releases/latest`
    );

    // Fetch contributors
    const contributorsEndpoint = `https://api.github.com/repos/${ org }/${ repo }/contributors?per_page=35`;

    contributors1 = await getContributors(`${ contributorsEndpoint }&page=1`);
    contributors2 = await getContributors(`${ contributorsEndpoint }&page=2`);
    contributors3 = await getContributors(`${ contributorsEndpoint }&page=3`);
  });
</script>

<!-- temporary thing to test theming. once a proper theme system is added this can be removed-->
<svelte:body class="theme-light" />

<PageSection id="hero-section">
  <Navbar {items} selectedItem={0} />
  <Flex align="center" gap id="hero-inner-container">
    <Flex direction="column" id="hero-left-container">
      <Title>Files</Title>
      <Subtext>A modern file explorer that pushes the boundaries of the platform.</Subtext>

      <Flex gap id="hero-button-container" wrap>
        <Button custom href="ms-windows-store://pdp/?ProductId={storeId}" type="primary">
          <Flex align="center" gap>
            <img alt="download button" src="static/icons/downloadButton.svg" />

            <Flex direction="column">
              <span class="button-title">Download {version}</span>
              <span class="button-description">Microsoft Store</span>
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
  <canvas bind:this={canvas} height="32" id="background-canvas" width="32" />
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
      <div class="contributors-row">
        {#each contributors1 as contributor}
          {#if !contributor.login.endsWith("[bot]")}
            <div class="contributor-card">
              <img
                class="contributor-avatar"
                src={contributor.avatar_url}
                alt="{contributor.login} avatar"
              />
              <div class="contributor-info">
                <h5>{contributor.login}</h5>
                <span
                >{contributor.contributions}
                  {contributor.contributions > 1 ? "Contributions" : "Contribution"}</span
                >
              </div>
            </div>
          {/if}
        {/each}
      </div>
      <div class="contributors-row">
        {#each contributors2 as contributor}
          {#if !contributor.login.endsWith("[bot]")}
            <div class="contributor-card">
              <img
                class="contributor-avatar"
                src={contributor.avatar_url}
                alt="{contributor.login} avatar"
              />
              <div class="contributor-info">
                <h5>{contributor.login}</h5>
                <span
                >{contributor.contributions}
                  {contributor.contributions > 1 ? "Contributions" : "Contribution"}</span
                >
              </div>
            </div>
          {/if}
        {/each}
      </div>
      <div class="contributors-row">
        {#each contributors3 as contributor}
          {#if !contributor.login.endsWith("[bot]")}
            <div class="contributor-card">
              <img
                class="contributor-avatar"
                src={contributor.avatar_url}
                alt="{contributor.login} avatar"
              />
              <div class="contributor-info">
                <h5>{contributor.login}</h5>
                <span
                >{contributor.contributions}
                  {contributor.contributions > 1 ? "Contributions" : "Contribution"}</span
                >
              </div>
            </div>
          {/if}
        {/each}
      </div>
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
			padding: 64px 72px;
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
			font-size: 14px;
			font-weight: 600;
			margin: 0;
			color: var(--text-primary);
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