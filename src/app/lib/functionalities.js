import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 0, checkperiod: 120 });

export async function fetchBoard() {
	let boardData = [];
	try {
		const response = await fetch(
			"https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value, solution}}}",
			{ cache: "no-store" }
		);
		const newBoard = await response.json();
		boardData = newBoard.newboard.grids[0].value;
		cache.set('latestSolution', newBoard.newboard.grids[0].solution);
	} catch (error) {
		console.error('Error fetching the board: ', error);
	}
	return boardData;
}

export function checkSolution(board, solution) {
	for (let i = 0; i < board.length; i++) {
		for (let j = 0; j < board[i].length; j++) {
			if (board[i][j] !== solution[i][j]) {
				return false;
			}
		}
	}
	return true;
}

export function getSolution(key) {
	return cache.get(key);
}