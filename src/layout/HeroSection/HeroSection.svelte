<script lang="ts">
	import { Button, ContentDialog, ListViewItem, MenuFlyout, PageSection, rainbowCanvas, TerminalCommand } from "$lib";
	import { links } from "$data/links";
	import { onMount } from "svelte";
	import ArrowDownload from "@fluentui/svg-icons/icons/arrow_download_24_regular.svg?raw";
	import ChevronDown from "@fluentui/svg-icons/icons/chevron_down_24_regular.svg?raw";
	import Code from "@fluentui/svg-icons/icons/code_24_regular.svg?raw";

	type DownloadSources = "Microsoft Store" | "Winget (CLI)" | "Sideload Package" | "Sideload Package (Preview)";
	const downloadSources: DownloadSources[] = ["Microsoft Store", "Winget (CLI)", "Sideload Package", "Sideload Package (Preview)"];

	// Check the user agent for a windows install
	let isWindows: boolean;

	let wingetDialogOpen = false;
	let wingetCommandCopied = false;

	let isDownloadDropdownOpen = false;

	// Group bindings
	let currentDownloadSource = 0;

	const getStoreUrl = () => isWindows
		? `ms-windows-store://pdp/?ProductId=${ links.storeId }&mode=mini`
		: `https://www.microsoft.com/en-us/p/files/${ links.storeId }`;
	$: sideloadLink = `/download/${ currentDownloadSource !== 3 ? "stable" : "preview" }`;
	$: downloadLink = currentDownloadSource === 0 ? getStoreUrl() : sideloadLink;

	const copyWingetCommand = () => {
		navigator.clipboard.writeText("winget install -e Files-Community.Files");
		wingetCommandCopied = true;
		setTimeout(() => {
			wingetCommandCopied = false;
		}, 500);
	};

	const updateDownloadSource = (value: number) => localStorage.setItem("downloadSource", value.toString());

	const changeDownloadSource = (downloadSource: DownloadSources, id: number) => {
		updateDownloadSource(id);

		if (downloadSource !== "Winget (CLI)") {
			window.open(downloadSource === "Microsoft Store" ? getStoreUrl() : sideloadLink, "_blank");
		} else {
			wingetDialogOpen = true;
		}

		isDownloadDropdownOpen = false;
	};

	onMount(async () => {
		// Get the user's download preference
		if (!localStorage.getItem("downloadSource")) {
			localStorage.setItem("downloadSource", "0");
		}
		currentDownloadSource = parseInt(localStorage.getItem("downloadSource")) ?? 0;

		isWindows = navigator.userAgent.includes("Windows");
	});

</script>

<PageSection id="hero-section">
	<div class="hero-left">
		<h1>Files</h1>
		<p>A modern file explorer that pushes the boundaries of the platform.</p>
		<div class="buttons-spacer">
			<div class="split-button">
				<Button
					href={currentDownloadSource !== 1 ? downloadLink : undefined}
					id="hero-download-button"
					on:click={() => {
						if (currentDownloadSource === 1) wingetDialogOpen = true;
					}}
					rel={currentDownloadSource !== 1 ? "noreferrer noopener" : undefined}
					target={currentDownloadSource !== 1 ? "_blank" : undefined}
					variant="accent"
				>
					{@html ArrowDownload}
					<div class="hero-button-inner">
						<h5>Download Files</h5>
						<span>{downloadSources[currentDownloadSource]}</span>
					</div>
				</Button>
				<MenuFlyout bind:open={isDownloadDropdownOpen}>
					<Button
						aria-label="Choose download source"
						title="Choose download source"
						variant="accent"
					>
						{@html ChevronDown}
					</Button>
					<svelte:fragment slot="menu">
						{#each downloadSources as downloadSource, id}
							<ListViewItem
								bind:group={currentDownloadSource}
								on:change={() => changeDownloadSource(downloadSource, id)}
								value={id}
							>
								{downloadSource}
							</ListViewItem>
						{/each}
					</svelte:fragment>
				</MenuFlyout>
			</div>
			<Button
				href="https://github.com/{links.github.owner}/{links.github.repo}/"
				rel="noreferrer noopener"
				target="_blank"
			>
				{@html Code}
				<div class="hero-button-inner">
					<h5>View GitHub</h5>
					<span>Files is open source!</span>
				</div>
			</Button>
		</div>
	</div>
	<div class="hero-right">
		<div class="hero-image-container">
			<picture>
				<source
					media="(prefers-color-scheme: dark)"
					srcset="/screenshots/hero-dark.png"
				/>
				<source
					media="(prefers-color-scheme: light)"
					srcset="/screenshots/hero-light.png"
				/>
				<img
					alt="Files new tab screenshot"
					height="768"
					src="/screenshots/hero-light.png"
					width="1024"
				/>
			</picture>
		</div>
	</div>
	<canvas slot="outer" use:rainbowCanvas></canvas>
</PageSection>

<ContentDialog
	bind:open={wingetDialogOpen}
	title="Installing Files via winget"
	width="448"
>
	To download and install Files using <a
		class="hyperlink"
		href="https://github.com/microsoft/winget-cli"
		rel="noreferrer noopener"
		target="_blank">winget</a>,
	paste the following command into a terminal of your choice:
	<TerminalCommand command="winget install -e Files-Community.Files" />
	<svelte:fragment slot="footer">
		<Button on:click={copyWingetCommand} variant="accent">
			{wingetCommandCopied ? "Copied!" : "Copy"}
		</Button>
		<Button on:click={() => (wingetDialogOpen = false)}>Close</Button>
	</svelte:fragment>
</ContentDialog>

<style lang="scss">
	@use "HeroSection";
</style>
