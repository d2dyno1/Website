<script lang="ts">
	import Button from "../common/Button.svelte"
	import type { Item } from "../utilTypes"
	import { org, repo } from "../stores"

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
			href: "https://discord.gg/files",
			external: true
		},
		{
			name: "GitHub",
			href: `https://github.com/${ org }/${ repo }/`,
			external: true
		}
	];
	export let selectedItem: Item;
</script>

<header id="navbar">
	<nav>
		<a href="/" id="navbar-logo-link">
			<img alt="Files logo" id="navbar-logo" src="https://files-community.github.io/img/logo.png" />
		</a>
		<div id="navbar-divider" role="separator"></div>
		{#each items as item, i}
			<!--suppress HtmlUnknownTarget -->
			<a
				class="navbar-item"
				class:selected={selectedItem === i}
				href={item.href}
				target={item.external ? "_blank" : undefined}
				rel={item.external ? "noreferrer noopener" : undefined}
			>
				{item.name}
			</a>
		{/each}
	</nav>
	<Button custom id="theme-button">
		<img alt="theme switch button" src="../../static/icons/themeButton.svg" />
	</Button>
</header>

<style lang="scss">
	#navbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;

		nav {
			display: flex;
			align-items: center;
		}

		:global(#theme-button) {
			width: 48px;
			height: 48px;
		}
	}

	#navbar-logo-link {
		border-radius: 4px;
	}

	#navbar-logo {
		width: 48px;
		height: 48px;
		user-select: none;
		-webkit-user-drag: none;
	}

	.navbar-item {
		font: {
			weight: 500;
			size: 16px;
		}
		margin-right: 32px;
		cursor: pointer;
		user-select: none;
		transition: 200ms ease opacity;
		text-decoration: none;
		opacity: 0.5;
		color: var(--text-primary);
		border-radius: 2px;

		&:hover {
			opacity: 0.75;
		}

		&.selected,
		&:focus-visible {
			opacity: 1;
		}
	}

	#navbar-divider {
		height: 24px;
		margin: 0 18px;
		opacity: 0.15;
		border-left: 1px solid #000;
	}
</style>