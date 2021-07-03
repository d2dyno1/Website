<script lang="ts">
	import type { Item } from "../utilTypes"
	import HomeIcon from "@fluentui/svg-icons/icons/home_24_regular.svg?raw"
	import BookIcon from "@fluentui/svg-icons/icons/book_information_24_regular.svg?raw"
	import SelectedHomeIcon from "@fluentui/svg-icons/icons/home_24_filled.svg?raw"
	import SelectedBookIcon from "@fluentui/svg-icons/icons/book_information_24_filled.svg?raw"

	export let currentIndex = 0

	// this stores the items
	// I have a custom type so I get completion here
	const items: Item[] = [
		{
			name: "Home",
			href: "/",
			icon: HomeIcon,
			// this line allows me to switch icon depending on which item is selected
			selectedIcon: SelectedHomeIcon,
		},
		{
			name: "Docs",
			href: "/",
			icon: BookIcon,
			selectedIcon: SelectedBookIcon,
			// this inserts a separator and adjusts the margin
			endOfSection: true,
			external: true,
		},
		{
			name: "Discord",
			href: "https://discord.gg/files",
			external: true,
		},
		{
			name: "GitHub",
			href: `https://github.com/files-community/files/`,
			external: true,
		},
	]
</script>

<nav id="navbar">
	<a href="/" id="navbar-logo-link">
		<img alt="Files logo" id="navbar-logo" src="/logo.svg"/>
	</a>
	<div class="navbar-divider" role="separator"></div>
	{#each items as item, i}
		<div class="navbar-item">
			{#if item.icon && item.selectedIcon}
				<div class="navbar-icon">{@html currentIndex === i ? item.selectedIcon : item.icon}</div>
			{/if}

			<!--suppress HtmlUnknownTarget -->
			<a class="navbar-link"
			   class:selected={currentIndex === i}
			   class:end-of-section={item.endOfSection}
			   href={item.href}
			   target={item.external ? "_blank" : undefined}
			   rel={item.external ? "noreferrer noopener" : undefined}
			>
				{item.name}
			</a>

			{#if item.endOfSection}
				<div class="navbar-divider" role="separator"></div>
			{/if}
		</div>
	{/each}
</nav>

<style lang="scss">
	@use "static/colors";
	@use "static/mixins";

	#navbar {
		@include mixins.blur-edges-inset(colors.$light-background-secondary);
		@include mixins.flex($inline: true, $align: center, $justify: start);

		width: 100vw;
		height: 10vh;
		margin-left: 1rem;
	}

	#navbar-logo {
		width: 3rem;
		height: 3rem;
		user-select: none;
		-webkit-user-drag: none;
	}

	.navbar-item {
		@include mixins.flex($align: start, $justify: center);
		min-height: 1.5rem;

		.navbar-link {
			font: {
				weight: 500;
				size: 1rem;
			}
			margin-right: 1.5rem;
			cursor: pointer;
			user-select: none;
			transition: 200ms ease opacity;
			text-decoration: none;
			color: colors.$light-text-primary;

			&.end-of-section { margin-right: 0 }

			&:hover { opacity: .75 }

			&:where(.selected, :focus-visible) { color: colors.$accent }
		}

		.navbar-icon {
			display: inline;
			height: 1.5rem;
			margin-right: .3rem;
			vertical-align: bottom;
			fill: colors.$accent;
		}
	}

	.navbar-divider {
		width: 3px;
		height: 1.5rem;
		margin: 0 1.125rem;
		opacity: 0.15;
		background: black;
	}
</style>