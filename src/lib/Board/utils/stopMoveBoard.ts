import { boardPositionData } from './store';

const stopMove = () => {
	boardPositionData.update((data) => ({
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

export default stopMove;
