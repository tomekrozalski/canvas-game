<script lang="ts">
	import { onMount } from 'svelte';
	import { boardSize, viewSize, scrollData } from './store';
	import moveBoard from './utils/moveBoard';

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;

	const setCanvasDimensions = () => {
		viewSize.set({
			width: window.innerWidth,
			height: window.innerHeight,
			pixelRatio: window.devicePixelRatio ?? 1
		});
	};

	const draw = () => {
		ctx.setTransform(1, 0, 0, 1, $scrollData.offsetLeft * -1, $scrollData.offsetTop * -1);

		ctx.clearRect(
			-$viewSize.width * $viewSize.pixelRatio,
			-$viewSize.height * $viewSize.pixelRatio,
			$viewSize.width * $viewSize.pixelRatio * 3,
			$viewSize.height * $viewSize.pixelRatio * 3
		);

		ctx.beginPath();
		ctx.fillStyle = 'coral';
		ctx.fillRect(0, 0, $boardSize.width, $boardSize.height);
		ctx.closePath();

		ctx.clearRect(100, 100, $boardSize.width - 200, $boardSize.height - 200);

		// 		ctx.beginPath();
		// 		ctx.arc(1400, 1400, 1400, 0, Math.PI * 2);
		// 		ctx.fillStyle = 'red';
		// 		ctx.fill();
		// 		ctx.closePath();
		//
		// 		ctx.beginPath();
		// 		ctx.arc(2800, 1400, 1400, 0, Math.PI * 2);
		// 		ctx.fillStyle = 'green';
		// 		ctx.fill();
		// 		ctx.closePath();
		//     const rectSize = 50;
		//     let xPos = 0;
		//     let yPos = 0;
		//
		//     for (let i = 0; i <= 255; i = i + 1) {
		//       for (let j = 0; j <= 255; j = j + 1) {
		//         ctx.fillStyle = `rgb(${i}, ${j}, 50)`;
		//         ctx.fillRect(xPos, yPos, rectSize, rectSize);
		//
		//         xPos = xPos + rectSize + 5;
		//       }
		//
		//       xPos = 0;
		//       yPos = yPos + rectSize + 5;
		//     }

		window.requestAnimationFrame(draw);
	};

	onMount(() => {
		ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
		setCanvasDimensions();
		draw();

		window.addEventListener('resize', setCanvasDimensions);
		return () => window.removeEventListener('resize', setCanvasDimensions);
	});

	const stopMove = () => {
		scrollData.update((data) => ({
			...data,
			isDragable: false,
			dragData: {
				beforeXPosition: 0,
				currentXPosition: 0,
				beforeYPosition: 0,
				currentYPosition: 0
			}
		}));
	};
</script>

<canvas
	width={$viewSize.width * $viewSize.pixelRatio}
	height={$viewSize.height * $viewSize.pixelRatio}
	style="width: {$viewSize.width}px; height: {$viewSize.height}px"
	on:pointerup={stopMove}
	on:pointerdown={() => ($scrollData.isDragable = true)}
	on:pointerout={stopMove}
	on:pointermove={moveBoard}
	bind:this={canvas}
/>
