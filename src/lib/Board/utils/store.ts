import { derived, writable } from 'svelte/store';
import type {
	BoardPositionlDataType,
	BoardSizeType,
	CellCoordinates,
	CellData,
	ViewSizeType,
	SingleCellData,
	CellRowData
} from './types';

export const boardSize = writable<BoardSizeType>({
	width: 5000,
	height: 4000
});

export const viewSize = writable<ViewSizeType>({
	width: 0,
	height: 0,
	pixelRatio: 1
});

export const boardPositionData = writable<BoardPositionlDataType>({
	isDragable: false,
	offsetLeft: 0,
	offsetTop: 0,
	dragData: {
		beforeXPosition: 0,
		currentXPosition: 0,
		beforeYPosition: 0,
		currentYPosition: 0
	}
});

export const context = writable<CanvasRenderingContext2D>();

export const cells = writable<CellData>({});
export const cellsArray = derived<typeof cells, CellCoordinates[]>(cells, ($cells) =>
	Object.entries($cells)
		.map(([row, values]) => Object.keys(values).map((column) => ({ row: +row, column: +column })))
		.flat()
);

export const resetCellProperties = (props: { [value: string]: boolean }) =>
	cells.update((data) =>
		Object.entries(data).reduce(
			(rowAccumulator: { [value: string]: CellRowData }, [rowIndex, columns]) => {
				const updatedColumns = Object.entries(columns).reduce(
					(columnAccumulator: { [value: string]: SingleCellData }, [columnIndex, field]) => {
						columnAccumulator[columnIndex] = { ...field, ...props };
						return columnAccumulator;
					},
					{}
				);

				rowAccumulator[rowIndex] = updatedColumns;
				return rowAccumulator;
			},
			{}
		)
	);
