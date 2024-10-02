import styles from './page.module.scss';
import SudokuBoard from './ui/components/Sudoku/SudokuBoard';
import Interacteables from './ui/components/Interacteables/Interacteables';
import NavBar from './ui/components/NavBar/NavBar';

import { getGrid } from './lib/functionalities';

export default async function Home() {
	const grid = await getGrid();

	const { solution, ...board } = grid.newboard.grids[0];

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
