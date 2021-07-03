<script lang="ts">
	import Title from "../common/text/Title.svelte"
	import { getReleaseVersion } from "../routes/fetchHomepageData"
	import { onMount } from "svelte"
	import MainSectionButton from "../common/MainSectionButton.svelte"

	let canvas: HTMLCanvasElement

	onMount(() => {
		let time = 0

		const red = (x, y, t) => Math.floor(135 + 64 * Math.cos((x * x - y * y) / 300 + t))
		const green = (x, y, t) =>
				Math.floor(135 + 64 * Math.sin((x * x * Math.cos(t / 4) + y * y * Math.sin(t / 3)) / 300))
		const blue = (x, y, t) =>
				Math.floor(135 + 64 *
						Math.sin(5 * Math.sin(t / 9) + ((x - 100) * (x - 100) + (y - 100) * (y - 100)) / 1100),
				)

		const run = () => {
			// Canvas
			const context = canvas.getContext("2d")

			for (let x = 0; x <= 35; x++) {
				for (let y = 0; y <= 35; y++) {
					context.fillStyle = `rgb(${ red(x, y, time) }, ${ green(x, y, time) }, ${ blue(x, y, time) })`
					context.fillRect(x, y, 1, 1)
				}
			}
			time += 0.05
			window.requestAnimationFrame(run)
		}
		run()
	})
</script>

<section id="main-section">
	<div id="main-inner-container">
		<div id="main-left-container">
			<div id="title">
				<img alt="Files logo" height="72" src="/logo.svg"/>
				<Title bold="semibold">Files</Title>
			</div>
			<p class="subtext">A modern file explorer that pushes the boundaries of the platform.</p>

			<div id="main-button-container">
				{#await getReleaseVersion()}
					<MainSectionButton title="Downloading&hellip;" description="Fetching version&hellip;"
					                   href="ms-windows-store://pdp/?ProductId=9nghp3dx8hdx" type={"primary"}>
						<svg fill="none" height="20" viewBox="0 0 48 48" width="20" xmlns="http://www.w3.org/2000/svg">
							<path
									d="M12.25 38.5H35.75C36.7165 38.5 37.5 39.2835 37.5 40.25C37.5 41.1682 36.7929 41.9212 35.8935 41.9942L35.75 42H12.25C11.2835 42 10.5 41.2165 10.5 40.25C10.5 39.3318 11.2071 38.5788 12.1065 38.5058L12.25 38.5H35.75H12.25ZM23.6065 6.2558L23.75 6.25C24.6682 6.25 25.4212 6.95711 25.4942 7.85647L25.5 8V29.333L30.2931 24.5407C30.9765 23.8573 32.0846 23.8573 32.768 24.5407C33.4514 25.2242 33.4514 26.3322 32.768 27.0156L24.9898 34.7938C24.3064 35.4772 23.1984 35.4772 22.515 34.7938L14.7368 27.0156C14.0534 26.3322 14.0534 25.2242 14.7368 24.5407C15.4202 23.8573 16.5282 23.8573 17.2117 24.5407L22 29.329V8C22 7.08183 22.7071 6.32881 23.6065 6.2558L23.75 6.25L23.6065 6.2558Z"
									fill="currentColor"
							/>
						</svg>
					</MainSectionButton>
				{:then githubVersion}
					<MainSectionButton title="Download {githubVersion}" description="Microsoft Store"
					                   href="ms-windows-store://pdp/?ProductId=9nghp3dx8hdx" type={"primary"}>
						<svg fill="none" height="20" viewBox="0 0 48 48" width="20" xmlns="http://www.w3.org/2000/svg">
							<path
									d="M12.25 38.5H35.75C36.7165 38.5 37.5 39.2835 37.5 40.25C37.5 41.1682 36.7929 41.9212 35.8935 41.9942L35.75 42H12.25C11.2835 42 10.5 41.2165 10.5 40.25C10.5 39.3318 11.2071 38.5788 12.1065 38.5058L12.25 38.5H35.75H12.25ZM23.6065 6.2558L23.75 6.25C24.6682 6.25 25.4212 6.95711 25.4942 7.85647L25.5 8V29.333L30.2931 24.5407C30.9765 23.8573 32.0846 23.8573 32.768 24.5407C33.4514 25.2242 33.4514 26.3322 32.768 27.0156L24.9898 34.7938C24.3064 35.4772 23.1984 35.4772 22.515 34.7938L14.7368 27.0156C14.0534 26.3322 14.0534 25.2242 14.7368 24.5407C15.4202 23.8573 16.5282 23.8573 17.2117 24.5407L22 29.329V8C22 7.08183 22.7071 6.32881 23.6065 6.2558L23.75 6.25L23.6065 6.2558Z"
									fill="currentColor"
							/>
						</svg>
					</MainSectionButton>
				{:catch error}
					<MainSectionButton title="Error!" description="Failed to load latest version."
					                   href="ms-windows-store://pdp/?ProductId=9nghp3dx8hdx" type={"primary"}>
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48" fill="none">
							<path
									d="M12.25 38.5H35.75C36.7165 38.5 37.5 39.2835 37.5 40.25C37.5 41.1682 36.7929 41.9212 35.8935 41.9942L35.75 42H12.25C11.2835 42 10.5 41.2165 10.5 40.25C10.5 39.3318 11.2071 38.5788 12.1065 38.5058L12.25 38.5H35.75H12.25ZM23.6065 6.2558L23.75 6.25C24.6682 6.25 25.4212 6.95711 25.4942 7.85647L25.5 8V29.333L30.2931 24.5407C30.9765 23.8573 32.0846 23.8573 32.768 24.5407C33.4514 25.2242 33.4514 26.3322 32.768 27.0156L24.9898 34.7938C24.3064 35.4772 23.1984 35.4772 22.515 34.7938L14.7368 27.0156C14.0534 26.3322 14.0534 25.2242 14.7368 24.5407C15.4202 23.8573 16.5282 23.8573 17.2117 24.5407L22 29.329V8C22 7.08183 22.7071 6.32881 23.6065 6.2558L23.75 6.25L23.6065 6.2558Z"
									fill="currentColor"/>
						</svg>
					</MainSectionButton>
				{/await}

				<MainSectionButton description="Files is open source!" href="https://github.com/files-community/files/"
				                   title="GitHub">
					<svg height="18" viewBox="0 0 16 16" width="18" xmlns="http://www.w3.org/2000/svg">
						<path
								d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
								fill="currentColor" fill-rule="evenodd"></path>
					</svg>
				</MainSectionButton>
			</div>
		</div>

		<canvas bind:this={canvas} height="32" id="background-canvas" width="32"></canvas>
	</div>
</section>

<style lang="scss">
	@use "static/colors";
	@use "static/mixins";

	#main-section {
		@include mixins.flex($direction: column, $justify: center);

		overflow: hidden;
		min-height: 36rem;
		padding: 2rem 4.5rem;
		background: colors.$light-background-secondary;

		#main-inner-container {
			@include mixins.flex($align: center, $gap: true);

			#main-left-container {
				@include mixins.flex($direction: column);
			}
		}
	}

	#title {
		@include mixins.flex($align: center);
		gap: 3%;

		img {
			user-select: none;
			-webkit-user-drag: none;
		}
	}

	#background-canvas {
		position: absolute;
		right: 0;
		bottom: 0;
		width: 100vh;
		height: 100vh;
		pointer-events: none;
		mask: radial-gradient(at bottom right, #000, transparent 70%);
	}

	#main-button-container {
		@include mixins.flex($wrap: true, $gap: true);

		margin-top: 1.5em;
	}
</style>