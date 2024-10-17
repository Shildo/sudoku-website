import NodeCache from "node-cache";
import { getSudoku } from "sudoku-gen";

const cache = new NodeCache({ stdTTL: 0, checkperiod: 120 });

export async function fetchBoard() {
	const { puzzle, solution, difficulty } = getSudoku();

	const puzzleArray = puzzle.split('').map(val => (val === '-' ? 0 : parseInt(val)));
	const formattedPuzzle = [];
	while (puzzleArray.length) formattedPuzzle.push(puzzleArray.splice(0, 9));

	cache.set('solution', solution);

	return formattedPuzzle;
}

export function checkSolution(board, solution) {
	return board.flat().join('') === solution;
}

export function getSolution(key) {
	return cache.get(key);
}