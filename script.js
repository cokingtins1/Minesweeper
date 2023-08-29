// Display/UI

import { createBoard } from "./minesweeper.js"

const BOARD_SIZE = 10
const NUM_MINES = 2

const board = createBoard(BOARD_SIZE, NUM_MINES)
const boardElement = document.querySelector(".board")

board.forEach((row) => {
	row.forEach((tile) => {
		boardElement.append(tile.element)
	})
})

boardElement.style.setProperty("--size", BOARD_SIZE)

console.log(board)

// 1. Populate a board with tiles/mines
// 2. left-click on tiles
// a. reveal tiles
// 3. right-click on tiles
// b. mark tile
// 4. check for win/loss
