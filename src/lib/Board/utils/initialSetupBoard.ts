import { context, viewSize } from './store';
import draw from './draw';
import setFields from './setFields';

const setCanvasDimensions = () => {
	viewSize.set({
		width: window.innerWidth,
		height: window.innerHeight,
		pixelRatio: window.devicePixelRatio ?? 1
	});
};

const setupBoard = (canvas: HTMLCanvasElement) => {
	context.set(canvas.getContext('2d') as CanvasRenderingContext2D);
	setCanvasDimensions();
	setFields();
	draw();

	window.addEventListener('resize', setCanvasDimensions);
	return () => window.removeEventListener('resize', setCanvasDimensions);
};

export default setupBoard;
