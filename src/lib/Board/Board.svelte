<script lang="ts">
	import { onMount } from 'svelte';
	import { viewSize, boardPositionData, cells, resetCellProperties } from './utils/store';
	import moveBoard from './utils/moveBoard';
	import stopMoveBoard from './utils/stopMoveBoard';
	import initialSetupBoard from './utils/initialSetupBoard';

	let canvas: HTMLCanvasElement;

	const mousemove = (e: MouseEvent) => {
		const { clientX, clientY } = e;

		const horizontal = clientX + $boardPositionData.offsetLeft / $viewSize.pixelRatio - 1;
		const vertical = clientY + $boardPositionData.offsetTop / $viewSize.pixelRatio - 2;

		const highlightedCell = {
			column: Math.floor((horizontal / 40) * $viewSize.pixelRatio),
			row: Math.floor((vertical / 40) * $viewSize.pixelRatio)
		};

		resetCellProperties({ isHighlighted: false });
		cells.update((data) => {
			data[highlightedCell.row][highlightedCell.column].isHighlighted = true;
			return data;
		});
	};

	onMount(() => {
		initialSetupBoard(canvas);
	});
</script>

<canvas
	width={$viewSize.width * $viewSize.pixelRatio}
	height={$viewSize.height * $viewSize.pixelRatio}
	style="width: {$viewSize.width}px; height: {$viewSize.height}px"
	on:mousemove={mousemove}
	on:pointerup={stopMoveBoard}
	on:pointerdown={() => ($boardPositionData.isDragable = true)}
	on:pointerout={stopMoveBoard}
	on:pointermove={moveBoard}
	bind:this={canvas}
/>
