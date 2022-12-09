import { writable } from 'svelte/store';

type BoardSizeType = {
	width: number;
	height: number;
};

export const boardSize = writable<BoardSizeType>({
	width: 5000,
	height: 4000
});

type ViewSizeType = {
	width: number;
	height: number;
	pixelRatio: number;
};

export const viewSize = writable<ViewSizeType>({
	width: 0,
	height: 0,
	pixelRatio: 1
});

type ScrollDataType = {
	isDragable: boolean;
	offsetLeft: number;
	offsetTop: number;
	dragData: {
		beforeXPosition: number;
		currentXPosition: number;
		beforeYPosition: number;
		currentYPosition: number;
	};
};

export const scrollData = writable<ScrollDataType>({
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
