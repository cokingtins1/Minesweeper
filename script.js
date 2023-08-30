// Display/UI

import {
	TILE_STATUSES,
	createBoard,
	markTile,
	revealTile,
	checkWin,
	checkLoss,
} from "./minesweeper.js"

const BOARD_SIZE = 10
const NUM_MINES = 2

const board = createBoard(BOARD_SIZE, NUM_MINES)
const boardElement = document.querySelector(".board")
const minesLeft = document.querySelector("[data-mine-count]")

const messageText = document.querySelector(".subtext")

board.forEach((row) => {
	row.forEach((tile) => {
		boardElement.append(tile.element)
		// left click
		tile.element.addEventListener("click", () => {
			revealTile(board, tile)
			checkGameEnd()
		})
		// right click - mark tile
		tile.element.addEventListener("contextmenu", (e) => {
			e.preventDefault()
			markTile(tile)
			listMinesLeft()
		})
	})
})

boardElement.style.setProperty("--size", BOARD_SIZE)
minesLeft.textContent = NUM_MINES

function listMinesLeft() {
	const markedTilesCount = board.reduce((count, row) => {
		return (
			count +
			row.filter((tile) => tile.status === TILE_STATUSES.MARKED).length
		)
	}, 0)

	minesLeft.textContent = NUM_MINES - markedTilesCount
}

function checkGameEnd() {
	const win = checkWin(board)
	const lose = checkLoss(board)

	if (win || lose) {
		boardElement.addEventListener("click", stopProp, { catpure: true })
		boardElement.addEventListener("contextmenu", stopProp, {
			catpure: true,
		})
	}
	if (win) {
		messageText.textContent = "You Win"
	}
	if (lose) {
		messageText.textContent = "You Lose"
		board.forEach((row) => {
			row.forEach((tile) => {
				if (tile.status === TILE_STATUSES.MARKED) markTile(tile)
				if (tile.mine) revealTile(board, tile)
			})
		})
	}
}

function stopProp(e) {
	e.stopImmediatePropagation()
}

console.log(board)

// 1. Populate a board with tiles/mines
// 2. left-click on tiles
// a. reveal tiles
// 3. right-click on tiles
// b. mark tile
// 4. check for win/loss
