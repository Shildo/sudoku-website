import { getSudoku } from "sudoku-gen";


export async function fetchBoard(difficulty) {

	const { puzzle } = getSudoku(difficulty);

	const puzzleArray = puzzle.split('').map(val => (val === '-' ? 0 : parseInt(val)));
	const formattedPuzzle = [];
	while (puzzleArray.length) formattedPuzzle.push(puzzleArray.splice(0, 9));

	return formattedPuzzle;
}

export function checkSolution(board) {
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
