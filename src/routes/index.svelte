<script lang="ts">
	import CommunitySection from "../components/CommunitySection.svelte"
	import MainSection from "../components/MainSection.svelte"
</script>

<svelte:head><title>Files</title></svelte:head>

<!-- Temporary thing to test theming; once a proper theme system is added this can be removed-->
<svelte:body class="theme-light"/>

<main>
	<MainSection/>
</main>
<CommunitySection/>

<style lang="scss">
	:global(.theme-dark #background-canvas) {
		opacity: 0.5;
	}
</style>