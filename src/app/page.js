"use client";

import styles from './page.module.scss';
import { useState, useEffect } from 'react';
// import SudokuBoard from './ui/components/Sudoku/SudokuBoard';
// import Interacteables from './ui/components/Interacteables/Interacteables';
import SkeletonSudokuBoard from './ui/components/SkeletonSudokuBoard/SkeletonSudokuBoard';
import SecondInteracteable from './ui/components/SecondInteracteable/SecondInteracteable';
import SecondSudoku from './ui/components/SecondSudoku/SecondSudoku';
import NavBar from './ui/components/NavBar/NavBar';

export default function Home() {
	const [initialBoard, setInitialBoard] = useState([]);
	const [editableBoard, setEditableBoard] = useState([]);
	const [selectedCell, setSelectedCell] = useState({ row: null, col: null });
	const [loading, setLoading] = useState(true);


	const fetchBoard = async () => {
		try {
			const response = await fetch("https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value}}}");
			const board = await response.json();
			const data = board.newboard.grids[0].value;
			setInitialBoard(data);
			setEditableBoard(data);
		} catch (error) {
			console.error('Error fetching the board: ', error);
		} finally {
			setLoading(false);
		}
	};

	const handleCellUpdate = (row, col, number) => {
		const newBoard = [...editableBoard];
		newBoard[row][col] = number;
		setEditableBoard(newBoard);
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
					<SecondSudoku
						initialBoard={initialBoard}
						editableBoard={editableBoard}
						setSelectedCell={setSelectedCell}
						handleCellUpdate={handleCellUpdate}
					/>
				)}
				<SecondInteracteable
					selectedCell={selectedCell}
					handleCellUpdate={handleCellUpdate}
					fetchNewBoard={fetchBoard}
				/>
			</div>
		</main>
	);
}
