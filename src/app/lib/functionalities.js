export async function getGrid() {
	const res = fetch("https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value,difficulty,solution}}}")
	const data = (await res).json();
	return data;
}