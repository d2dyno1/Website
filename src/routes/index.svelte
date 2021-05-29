<script lang="ts">
	import Navbar from "../components/Navbar.svelte"
	import CommunitySection from "../components/CommunitySection.svelte"
	import MainSection from "../components/MainSection.svelte"
</script>

<svelte:head><title>Files</title></svelte:head>

<!-- temporary thing to test theming. once a proper theme system is added this can be removed-->
<svelte:body class="theme-light"/>

<Navbar selectedItem={0}/>
<MainSection/>
<CommunitySection/>

<style lang="scss">
	@use "static/global";

	:global {
		#main-inner-container,
		#main-left-container {
			flex: 1 1 auto;
		}
	}

	:global(.theme-dark #background-canvas) {
		opacity: 0.5;
	}

	:global {
		.acrylic-material {
			overflow: hidden;
			backdrop-filter: blur(60px) saturate(5);

			&::before {
				@include global.lightAcrylicLayerBackground;

				position: absolute;
				z-index: -1;
				width: 100%;
				height: 100%;
				content: "";
				opacity: 0.8;
				background-blend-mode: normal, color, luminosity;
			}
		}
	}
</style>