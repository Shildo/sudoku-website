"use client";

import styles from './page.module.scss';
import { useState, useEffect, useRef } from 'react';
import SudokuBoard from './ui/components/SudokuBoard/SudokuBoard';
import SkeletonSudokuBoard from './ui/components/SkeletonSudokuBoard/SkeletonSudokuBoard';
import NavBar from './ui/components/NavBar/NavBar';
import Interacteables from './ui/components/Interacteables/Interacteables';

export default function Home() {
	const [initialBoard, setInitialBoard] = useState([]);
	const [editableBoard, setEditableBoard] = useState([]);
	const [selectedCell, setSelectedCell] = useState({ row: null, col: null });
	const [loading, setLoading] = useState(true);

	const controllerRef = useRef(null);

	const fetchBoard = async () => {

		if (controllerRef.current) {
			controllerRef.current.abort();
		}

		const newController = new AbortController();
		controllerRef.current = newController;

		try {
			setLoading(true);
			const response = await fetch("https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value}}}", {
				signal: newController.signal,
			});
			const board = await response.json();
			const data = board.newboard.grids[0].value;

			setInitialBoard(data);
			setEditableBoard([...data.map(row => [...row])]);
		} catch (error) {
			if (error.name === 'AbortError') {
				console.log('Fetch aborted');
			}
			console.error('Error fetching the board: ', error);
		} finally {
			setLoading(false);
		}
	};

	const handleCellUpdate = (row, col, number) => {
		if (initialBoard[row][col] === 0) {
			const newBoard = [...editableBoard];
			newBoard[row][col] = number;
			setEditableBoard(newBoard);
		}
	};

	useEffect(() => {
		fetchBoard();

		return () => {
			if (controllerRef.current) {
				controllerRef.current.abort();
				controllerRef.current = null;
			}
		};
	}, []);

	return (
		<main className={styles.main}>
			<NavBar />
			<div className={styles.pageContent}>
				{loading ? (
					<SkeletonSudokuBoard />
				) : (
					<SudokuBoard
						initialBoard={initialBoard}
						editableBoard={editableBoard}
						setSelectedCell={setSelectedCell}
						handleCellUpdate={handleCellUpdate}
					/>
				)}
				<Interacteables
					loading={loading}
					selectedCell={selectedCell}
					handleCellUpdate={handleCellUpdate}
					fetchNewBoard={fetchBoard}
				/>
			</div>
		</main>
	);
}
