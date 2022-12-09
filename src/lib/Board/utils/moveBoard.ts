import { get } from 'svelte/store';
import { boardSize, scrollData, viewSize } from '../store';

const moveBoard = (e: MouseEvent) => {
	const { isDragable, dragData } = get(scrollData);
	const { height: boardHeight, width: boardWidth } = get(boardSize);
	const { height: viewHeight, width: viewWidth, pixelRatio } = get(viewSize);

	if (isDragable) {
		dragData.beforeXPosition = dragData.currentXPosition;
		dragData.currentXPosition = e.clientX;

		dragData.beforeYPosition = dragData.currentYPosition;
		dragData.currentYPosition = e.clientY;

		if (!dragData.beforeYPosition || !dragData.beforeYPosition) {
			return;
		}

		const horizontalDiff = dragData.beforeXPosition - dragData.currentXPosition;
		const verticalDiff = dragData.beforeYPosition - dragData.currentYPosition;

		const isOkHorzintaly = (offset: number, diff: number) => {
			if (boardWidth < viewWidth * pixelRatio) {
				return 0;
			}

			if (offset + diff < 0) {
				return 0;
			}

			if (offset + diff + viewWidth * pixelRatio > boardWidth) {
				return boardWidth - viewWidth * pixelRatio;
			}

			return offset + diff;
		};

		const isOkVertically = (offset: number, diff: number) => {
			if (boardHeight < viewHeight * pixelRatio) {
				return 0;
			}

			if (offset + diff < 0) {
				return 0;
			}

			if (offset + viewHeight * pixelRatio > boardHeight) {
				return boardHeight - viewHeight * pixelRatio;
			}

			return offset + diff;
		};

		scrollData.update((data) => ({
			...data,
			offsetLeft: isOkHorzintaly(data.offsetLeft, horizontalDiff),
			offsetTop: isOkVertically(data.offsetTop, verticalDiff)
		}));
	}
};

export default moveBoard;
