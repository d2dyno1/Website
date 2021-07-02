<script lang="ts">
	import CommunitySection from "../components/CommunitySection.svelte"
	import MainSection from "../components/MainSection.svelte"
	import { onMount } from "svelte"

	let canvas: HTMLCanvasElement

	onMount(() => {
		let time = 0

		const red = (x, y, t) => Math.floor(192 + 64 * Math.cos((x * x - y * y) / 300 + t))
		const green = (x, y, t) =>
				Math.floor(192 + 64 * Math.sin((x * x * Math.cos(t / 4) + y * y * Math.sin(t / 3)) / 300))
		const blue = (x, y, t) =>
				Math.floor(192 + 64 *
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

<svelte:head><title>Files</title></svelte:head>

<main>
	<MainSection/>
</main>
<CommunitySection/>