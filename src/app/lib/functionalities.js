import NodeCache from "node-cache";
import { getSudoku } from "sudoku-gen";

const cache = new NodeCache({ stdTTL: 1, checkperiod: 120 });

export async function fetchBoard(difficulty) {

	const { puzzle, solution } = getSudoku(difficulty);

	cache.set('solution', solution);

	const puzzleArray = puzzle.split('').map(val => (val === '-' ? 0 : parseInt(val)));
	const formattedPuzzle = [];
	while (puzzleArray.length) formattedPuzzle.push(puzzleArray.splice(0, 9));

	return formattedPuzzle;
}

export function checkSolution(board) {

	const solution = cache.get('solution');
	if (solution) {
		console.log('Volvio con solution');
		return board.flat().join('') === solution;
	}


	// function isValidGroup(seen, num) {
	// 	if (num < 1 || num > 9 || seen.has(num)) {
	// 		return false;
	// 	}
	// 	seen.add(num);
	// 	return true;
	// }

	// for (let i = 0; i < 9; i++) {
	// 	const rowSet = new Set();
	// 	const colSet = new Set();
	// 	const subGridSet = new Set();

	// 	for (let j = 0; j < 9; j++) {
	// 		if (!isValidGroup(rowSet, board[i][j])) {
	// 			return false;
	// 		}

	// 		if (!isValidGroup(colSet, board[j][i])) {
	// 			return false;
	// 		}

	// 		const rowIndex = 3 * Math.floor(i / 3) + Math.floor(j / 3);
	// 		const colIndex = 3 * (i % 3) + (j % 3);
	// 		if (!isValidGroup(subGridSet, board[rowIndex][colIndex])) {
	// 			return false;
	// 		}
	// 	}
	// }

	return true;
}
