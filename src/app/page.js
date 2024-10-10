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
	const [isNotesMode, setIsNotesMode] = useState(false);

	const controllerRef = useRef(null);

	const eraseNumber = () => {
		if (selectedCell.row !== null && selectedCell.col !== null) {
			const newBoard = [...editableBoard];
			if (initialBoard[selectedCell.row][selectedCell.col] === 0) {
				newBoard[selectedCell.row][selectedCell.col].value = 0;
				newBoard[selectedCell.row][selectedCell.col].notes = [];
				setEditableBoard(newBoard);
			}
		}
	}
	const takeNotes = () => {
		if (selectedCell)
			setIsNotesMode(prev => !prev);
	}

	const boardOptions = { eraseNumber, takeNotes }

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
			setEditableBoard(initializeBoard(data));
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
			if (isNotesMode) {
				const notes = newBoard[row][col].notes.includes(number)
					? newBoard[row][col].notes.filter(n => n !== number)
					: [...newBoard[row][col].notes, number];
				newBoard[row][col].notes = notes;
			} else {
				newBoard[row][col].value = number;
				newBoard[row][col].notes = [];
			}
			setEditableBoard(newBoard);
		}
	};

	const initializeBoard = (data) => {
		return data.map(row =>
			row.map(value => ({
				value,
				notes: []
			}))
		);
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
						isNotesMode={isNotesMode}
					/>
				)}
				<Interacteables
					loading={loading}
					selectedCell={selectedCell}
					handleCellUpdate={handleCellUpdate}
					fetchNewBoard={fetchBoard}
					boardOptions={boardOptions}
					isNotesMode={isNotesMode}
				/>
			</div>
		</main>
	);
}
