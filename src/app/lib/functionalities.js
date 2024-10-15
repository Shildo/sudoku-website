export async function fetchBoard() {
	let boardData = [];
	let solution;

	try {
		const response = await fetch(
			"https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value, solution}}}",
			{ cache: "no-store" }
		);
		const newBoard = await response.json();
		boardData = newBoard.newboard.grids[0].value;
		solution = newBoard.newboard.grids[0].solution;

	} catch (error) {
		console.error('Error fetching the board: ', error);
	}

	return boardData;
}