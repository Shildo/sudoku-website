"use client";

import styles from './page.module.scss';
import { useState, useEffect, useCallback } from 'react';
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
	const [difficulty, setDifficulty] = useState('');

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

	const fetchData = async () => {
		setLoading(true);
		try {
			const response = await fetch(`/api/new-board?difficulty=${encodeURIComponent(difficulty.toLowerCase())}`, {
				method: 'GET',
			});

			if (!response.ok)
				throw new Error('Network response was not ok')
			const newBoardData = await response.json();
			setInitialBoard(newBoardData);
			setEditableBoard(initializeBoard(newBoardData));
		} catch (error) {
			console.error("Error fetching new board: ", error);
			alert("Failed to fetch a new Sudoku board. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	const fetchAndIgnoreData = async () => {
		try {
			await fetch(`/api/new-board?difficulty=${encodeURIComponent(difficulty.toLowerCase())}`, {
				method: 'GET',
			});
		} catch (error) {
			console.error("Error in first fetch (ignored): ", error);
		}
	};

	useEffect(() => {
		const fetchDataTwice = async () => {
			await fetchAndIgnoreData();
			await fetchData();
		}
		fetchDataTwice();
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
					{loading ? (
						<SkeletonSudokuBoard />
					) : (
						<SudokuBoard
							initialBoard={initialBoard}
							editableBoard={editableBoard}
							setSelectedCell={setSelectedCell}
							handleCellUpdate={handleCellUpdate}
							isNotesMode={isNotesMode}
							eraseNumber={eraseNumber}
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
				/>
			</div>
		</main>
	);
}
