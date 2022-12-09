import { get } from 'svelte/store';
import { boardSize, boardPositionData, context, viewSize } from './store';

const draw = () => {
	const ctx = get(context);
	const { offsetLeft, offsetTop } = get(boardPositionData);
	const { height: viewHeight, width: viewWidth, pixelRatio } = get(viewSize);

	ctx.setTransform(1, 0, 0, 1, offsetLeft * -1, offsetTop * -1);
	ctx.clearRect(
		-viewWidth * pixelRatio,
		-viewHeight * pixelRatio,
		viewWidth * pixelRatio * 3,
		viewHeight * pixelRatio * 3
	);

	const rectSize = 39;
	let xPos = 0;
	let yPos = 0;

	const { height: boardHeight, width: boardWidth } = get(boardSize);

	const rows = boardHeight / 40;
	const columns = boardWidth / 40;

	for (let i = 0; i < rows; i = i + 1) {
		for (let j = 0; j < columns; j = j + 1) {
			ctx.fillStyle = '#84ad79';
			ctx.fillRect(xPos, yPos, rectSize, rectSize);

			xPos = xPos + rectSize + 1;
		}

		xPos = 0;
		yPos = yPos + rectSize + 1;
	}

	window.requestAnimationFrame(draw);
};

export default draw;
