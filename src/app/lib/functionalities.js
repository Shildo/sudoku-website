import { getSudoku } from "sudoku-gen";

export async function fetchBoard(difficulty) {

	const { puzzle } = getSudoku(difficulty);

	const puzzleArray = puzzle.split('').map(val => (val === '-' ? 0 : parseInt(val)));
	const formattedPuzzle = [];
	while (puzzleArray.length) formattedPuzzle.push(puzzleArray.splice(0, 9));

	return formattedPuzzle;
}

export function checkSolution(board) {
	function isValidGroup(seen, num) {
		if (num < 1 || num > 9 || seen.has(num)) {
			return false;
		}
		seen.add(num);
		return true;
	}

	for (let i = 0; i < 9; i++) {
		const rowSet = new Set();
		const colSet = new Set();
		const subGridSet = new Set();

		for (let j = 0; j < 9; j++) {
			if (!isValidGroup(rowSet, board[i][j])) {
				return false;
			}

			if (!isValidGroup(colSet, board[j][i])) {
				return false;
			}

			const rowIndex = 3 * Math.floor(i / 3) + Math.floor(j / 3);
			const colIndex = 3 * (i % 3) + (j % 3);
			if (!isValidGroup(subGridSet, board[rowIndex][colIndex])) {
				return false;
			}
		}
	}

	return true;
}
