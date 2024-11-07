"use client";

import styles from './page.module.scss';
import { useState, useEffect, useCallback } from 'react';
import SudokuBoard from './ui/components/SudokuBoard/SudokuBoard';
import SkeletonSudokuBoard from './ui/components/SkeletonSudokuBoard/SkeletonSudokuBoard';
import NavBar from './ui/components/NavBar/NavBar';
import Interacteables from './ui/components/Interacteables/Interacteables';
import { fetchBoard } from './lib/boardFunctions';

export default function Home() {
	const [initialBoard, setInitialBoard] = useState([]);
	const [editableBoard, setEditableBoard] = useState([]);
	const [selectedCell, setSelectedCell] = useState({ row: null, col: null });
	const [loading, setLoading] = useState(true);
	const [isNotesMode, setIsNotesMode] = useState(false);
	const [difficulty, setDifficulty] = useState('');
	const [isPaused, setIsPaused] = useState(false);

	const difficulties = ['Easy', 'Medium', 'Hard', 'Expert', ''];

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

	useEffect(() => {
		const handleKeyDown = (event) => {
			setIsPaused(false);

			const key = event.key;
			const number = parseInt(key);
			const directionOffsets = {
				ArrowUp: { row: -1, col: 0 },
				ArrowDown: { row: 1, col: 0 },
				ArrowLeft: { row: 0, col: -1 },
				ArrowRight: { row: 0, col: 1 }
			}

			if (/^F[1-9]$|^F1[0-2]$/.test(key)) {
				return;
			}

			if (selectedCell.row !== null && selectedCell.col !== null) {
				if (/[1-9]/.test(key)) {
					handleCellUpdate(selectedCell.row, selectedCell.col, number);
				} else if (key === 'Backspace' || key === 'Delete') {
					handleCellUpdate(selectedCell.row, selectedCell.col, 0);
				} else if (key in directionOffsets) {
					const { row: rowOffset, col: colOffset } = directionOffsets[key];
					const newRow = Math.min(8, Math.max(0, selectedCell.row + rowOffset));
					const newCol = Math.min(8, Math.max(0, selectedCell.col + colOffset));

					setSelectedCell({ row: newRow, col: newCol });
				}
			}
		};

		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [selectedCell, isNotesMode]);

	const handleCellUpdate = useCallback((row, col, number) => {
		if (initialBoard[row][col] === 0) {
			const newBoard = [...editableBoard];

			if (isNotesMode) {
				const notes = newBoard[row][col].notes.includes(number)
					? newBoard[row][col].notes.filter(n => n !== number)
					: [...newBoard[row][col].notes, number];
				newBoard[row][col].notes = notes;
				newBoard[row][col].value = 0;
			} else {
				newBoard[row][col].value = number;
				newBoard[row][col].notes = [];
			}

			setEditableBoard(newBoard);
		}
	}, [initialBoard, editableBoard, isNotesMode]);

	const initializeBoard = (data) => {
		return data.map(row =>
			row.map(value => ({
				value,
				notes: []
			}))
		);
	};

	const fetchData = () => {
		setSelectedCell({ row: null, col: null });
		setLoading(true);

		const newBoard = fetchBoard(difficulty.toLowerCase());

		setInitialBoard(newBoard);
		setEditableBoard(initializeBoard(newBoard));

		setLoading(false);
	};


	useEffect(() => {
		fetchData();
	}, []);

	const handleDifficultySelect = (dif) => {
		setDifficulty(dif);
	}

	return (
		<main className={styles.main}>
			<NavBar />
			<div className={styles.pageContent}>
				<div>
					<div className={styles.difficultyContainer}>
						{difficulties.map((dif) => (
							<button
								key={dif}
								onClick={() => handleDifficultySelect(dif)}
								className={`${difficulty === dif ? styles.selected : ''}`}
							>
								{dif === '' ? 'Random' : dif}
							</button>
						))}
					</div>
					{loading || isPaused ? (
						<SkeletonSudokuBoard />
					) : (
						<SudokuBoard
							initialBoard={initialBoard}
							editableBoard={editableBoard}
							setSelectedCell={setSelectedCell}
							selectedCell={selectedCell}
						/>
					)}
				</div>
				<Interacteables
					loading={loading}
					selectedCell={selectedCell}
					handleCellUpdate={handleCellUpdate}
					fetchNewBoard={fetchData}
					boardOptions={{ eraseNumber, takeNotes }}
					isNotesMode={isNotesMode}
					isPaused={isPaused}
					setIsPaused={setIsPaused}
				/>
			</div>
		</main>
	);
}
