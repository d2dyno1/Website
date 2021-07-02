<script lang="ts">
	import Button from "../common/Button.svelte"
	import type { Item } from "../utilTypes"

	const items: Item[] = [
		{
			name: "Home",
			href: "/",
			icon: "Home"
		},
		{
			name: "Docs",
			href: "/",
			icon: "BookAnswers",
			external: true,
		},
		{
			name: "Discord",
			href: "https://discord.gg/files",
			icon: "OfficeChat",
			external: true,
		},
		{
			name: "GitHub",
			href: `https://github.com/files-community/files/`,
			icon: "GitGraph",
			external: true,
		},
	]
	export let selectedItem: Item
</script>

<header id="navbar">
	<nav>
		<a href="/" id="navbar-logo-link">
			<img alt="Files logo" id="navbar-logo" src="/logo.svg"/>
		</a>
		<div id="navbar-divider" role="separator"></div>
		{#each items as item, i}
			<div class="navbar-item">
				<i class="ms-Icon ms-{item.brandIcon ? 'BrandIcon' : 'Icon'}--{item.icon}" aria-hidden="true"></i>
				<!--suppress HtmlUnknownTarget -->
				<a class="navbar-link"
				   class:selected={selectedItem === i}
				   href={item.href}
				   target={item.external ? "_blank" : undefined}
				   rel={item.external ? "noreferrer noopener" : undefined}
				>
					{item.name}
				</a>
			</div>
		{/each}
	</nav>
	<Button custom id="theme-button">
		<svg fill="none" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
			<path
					d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 20V4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20Z"
					fill="currentColor"
			/>
		</svg>
	</Button>
</header>

<style lang="scss">
	@use "static/global" as styles;

	#navbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;

		nav {
			display: flex;
			align-items: center;
		}
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
		align-items: center;
		flex-direction: row;
		justify-content: center;

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
			opacity: 0.5;
			color: styles.$light-text-primary;
			border-radius: 2px;

			&:hover {
				opacity: 0.75;
			}

			&.selected,
			&:focus-visible {
				opacity: 1;
			}
		}

		.ms-Icon {
			font-size: 1.2em;
			display: inline;
			margin-right: .3em;
			vertical-align: bottom;
			color: styles.$accent;
		}
	}

	#navbar-divider {
		height: 24px;
		margin: 0 18px;
		opacity: 0.15;
		border-left: 1px solid #000;
	}
</style>