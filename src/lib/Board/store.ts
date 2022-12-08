import {  writable } from 'svelte/store';

type BoardSizeType = {
  width: number;
  height: number;
}

export const boardSize = writable<BoardSizeType>({
  width: 0,
  height: 0,
})

type ScrollDataType = {
  horizontalMove: number;
  verticalMove: number;
  offsetLeft: number;
  offsetRight: number;
}

export const scrollData = writable<ScrollDataType>({
  horizontalMove: 0,
  verticalMove: 0,
  offsetLeft: 0,
  offsetRight: 0,
});
