import styles from './page.module.scss';
import Sudoku from './components/Sudoku/Sudoku';

async function getGrid() {
	const res = fetch("https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value,difficulty,solution}}}")
	const data = (await res).json();
	return data;
}

export default async function Home() {
	const grid = await getGrid();

	const { solution, ...board } = grid.newboard.grids[0];

	console.log(board);

	return (
		<main className={styles.main}>
			<Sudoku board={board} />
		</main>
	);
}
