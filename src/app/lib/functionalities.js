export async function getServerSideProps() {
	const res = await fetch("https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value,difficulty,solution}}}");
	const data = (await res).json();

	return {
		props: {
			grid: data.newboard.grids[0]
		},
	};
}
