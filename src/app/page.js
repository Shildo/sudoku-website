import styles from './page.module.scss';
import SudokuGrid from "./components/SudokuGrid/SudokuGrid";
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
			{/* <SudokuGrid board={board} /> */}
			<Sudoku board={board} />
		</main>
	);
}
