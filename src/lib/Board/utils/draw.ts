import { get } from 'svelte/store';
import { boardPositionData, cells, context, viewSize } from './store';

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

	Object.entries(get(cells)).forEach(([rowIndex, columns]) => {
		Object.entries(columns).forEach(([columnIndex, field]) => {
			ctx.beginPath();
			ctx.fillStyle = field.isHighlighted ? 'coral' : '#84ad79';

			ctx.fillRect(+columnIndex * 40, +rowIndex * 40, rectSize, rectSize);
		});
	});

	window.requestAnimationFrame(draw);
};

export default draw;
