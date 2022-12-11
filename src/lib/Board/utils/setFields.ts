import { get } from 'svelte/store';
import { boardSize, cells } from './store';

const setFields = () => {
	const { height: boardHeight, width: boardWidth } = get(boardSize);

	const columns = new Array(boardWidth / 40).fill('');
	const rows = new Array(boardHeight / 40).fill('');

	cells.set(
		rows.reduce((acc, _, row) => {
			acc[row] = {};

			columns.forEach((_, column) => {
				acc[row][column] = { isAvailable: true, isHightlighted: false };
			});

			return acc;
		}, {})
	);
};

export default setFields;
