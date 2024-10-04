"use client";

import styles from './page.module.scss';
import SudokuBoard from './ui/components/Sudoku/SudokuBoard';
import Interacteables from './ui/components/Interacteables/Interacteables';
import NavBar from './ui/components/NavBar/NavBar';
import { useState, useEffect } from 'react';
import SkeletonSudokuBoard from './ui/components/SkeletonSudokuBoard/SkeletonSudokuBoard';

export default function Home() {
	const [board, setBoard] = useState(null);
	const [loading, setLoading] = useState(true);


	const fetchBoard = async () => {
		try {
			const response = await fetch("https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value}}}");
			const data = await response.json();
			const newBoard = data.newboard.grids[0].value;
			setBoard(newBoard);
		} catch (error) {
			console.error("Error fetching the board:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchBoard();
	}, []);

	return (
		<main className={styles.main}>
			<NavBar />
			<div className={styles.pageContent}>
				{loading ? (
					<SkeletonSudokuBoard />
				) : (
					<SudokuBoard board={board} />
				)}
				<Interacteables fetchNeWBoard={fetchBoard} />
			</div>
		</main>
	);
}
