import styles from './page.module.scss';
import SudokuBoard from './ui/components/Sudoku/SudokuBoard';
import Interacteables from './ui/components/Interacteables/Interacteables';
import NavBar from './ui/components/NavBar/NavBar';

export default async function Home() {

	const res = await fetch("https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value,difficulty,solution}}}");
	const data = await res.json();
	const grid = data.newboard.grids[0];

	const { solution, ...board } = grid;

	return (
		<main className={styles.main}>
			<NavBar />
			<div className={styles.pageContent}>
				<SudokuBoard board={board} />
				<Interacteables />
			</div>
		</main>
	);
}

