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

	if (solution) {
		return board.flat().join('') === solution;
	}

	const size = 9;
	const boxSize = 3;

	const rows = Array.from({ length: size }, () => new Set());
	const cols = Array.from({ length: size }, () => new Set());
	const boxes = Array.from({ length: size }, () => new Set());

	for (let r = 0; r < size; r++) {
		for (let c = 0; c < size; c++) {
			const value = board[r][c];

			if (value === 0) return false;

			const boxIndex = Math.floor(r / boxSize) * boxSize + Math.floor(c / boxSize);

			if (rows[r].has(value) || cols[c].has(value) || boxes[boxIndex].has(value)) {
				return false;
			}

			rows[r].add(value);
			cols[c].add(value);
			boxes[boxIndex].add(value);
		}
	}

	return true;


}
