import NodeCache from "node-cache";
import { getSudoku } from "sudoku-gen";

const cache = new NodeCache({ stdTTL: 3600, checkperiod: 120 });

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
	return board.flat().join('') === solution;
}
