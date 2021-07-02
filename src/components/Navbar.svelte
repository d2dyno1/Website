<script lang="ts">
	import type { Item } from "../utilTypes"
	import HomeIcon from "@fluentui/svg-icons/icons/home_24_regular.svg?raw"
	import BookIcon from "@fluentui/svg-icons/icons/book_information_24_regular.svg?raw"
	import ChatIcon from "@fluentui/svg-icons/icons/chat_bubbles_question_24_regular.svg?raw"
	import GitIcon from "@fluentui/svg-icons/icons/branch_24_regular.svg?raw"
	import SelectedHomeIcon from "@fluentui/svg-icons/icons/home_24_filled.svg?raw"
	import SelectedBookIcon from "@fluentui/svg-icons/icons/book_information_24_filled.svg?raw"
	import SelectedChatIcon from "@fluentui/svg-icons/icons/chat_bubbles_question_24_filled.svg?raw"
	import SelectedGitIcon from "@fluentui/svg-icons/icons/branch_24_filled.svg?raw"

	const items: Item[] = [
		{
			name: "Home",
			href: "/",
			icon: HomeIcon,
			selectedIcon: SelectedHomeIcon,
			selected: true,
		},
		{
			name: "Docs",
			href: "/",
			icon: BookIcon,
			selectedIcon: SelectedBookIcon,
			external: true,
		},
		{
			name: "Discord",
			href: "https://discord.gg/files",
			icon: ChatIcon,
			selectedIcon: SelectedChatIcon,
			external: true,
		},
		{
			name: "GitHub",
			href: `https://github.com/files-community/files/`,
			icon: GitIcon,
			selectedIcon: SelectedGitIcon,
			external: true,
		},
	]
</script>

<nav id="navbar">
	<a href="/" id="navbar-logo-link">
		<img alt="Files logo" id="navbar-logo" src="/logo.svg"/>
	</a>
	<div id="navbar-divider" role="separator"></div>
	{#each items as item, i}
		<div class="navbar-item">
			<div class="navbar-icon">{@html item.selected ? item.selectedIcon : item.icon}</div>
			<!--suppress HtmlUnknownTarget -->
			<a class="navbar-link"
			   class:selected={item.selected}
			   href={item.href}
			   target={item.external ? "_blank" : undefined}
			   rel={item.external ? "noreferrer noopener" : undefined}
			>
				{item.name}
			</a>
		</div>
	{/each}
</nav>

<style lang="scss">
	@use "static/global" as styles;

	#navbar {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		width: 100%;
	}

	:global(#theme-button) {
		width: 3em;
		height: 3em;
		margin-right: 1em;
		padding: 0;
	}

	#navbar-logo-link {
		border-radius: 4px;
	}

	#navbar-logo {
		width: 48px;
		height: 48px;
		margin-top: .5em;
		margin-left: 1em;
		user-select: none;
		-webkit-user-drag: none;
	}

	.navbar-item {
		display: flex;
		align-items: flex-start; // vertical
		flex-flow: row nowrap;
		justify-content: center; // horizontal

		.navbar-link {
			font: {
				weight: 500;
				size: 16px;
			}
			margin-right: 32px;
			cursor: pointer;
			user-select: none;
			transition: 200ms ease opacity;
			text-decoration: none;
			color: styles.$light-text-primary;
			border-radius: 2px;

			&:hover {
				opacity: 0.75;
			}

			&.selected,
			&:focus-visible {
				color: styles.$accent;
			}
		}

		.navbar-icon {
			display: inline;
			height: 1.5em;
			margin-right: .3em;
			vertical-align: bottom;
			fill: styles.$accent;
		}
	}

	#navbar-divider {
		height: 24px;
		margin: 0 18px;
		opacity: 0.15;
		border-left: 1px solid #000;
	}
</style>