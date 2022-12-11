export type BoardSizeType = {
	width: number;
	height: number;
};

export type BoardPositionlDataType = {
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

export type ViewSizeType = {
	width: number;
	height: number;
	pixelRatio: number;
};

export type CellCoordinates = {
	column: number;
	row: number;
};

export type SingleCellData = {
	isHighlighted: boolean;
	isBuildable: boolean;
	// content?: CellContentType;
};

export type CellRowData = {
	[column: number]: SingleCellData;
};

export type CellData = {
	[row: number]: CellRowData;
};
