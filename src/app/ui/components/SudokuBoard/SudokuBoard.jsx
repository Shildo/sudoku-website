"use client"

import { useCallback, useEffect, useState, useMemo } from 'react';
import styles from './SudokuBoard.module.scss'
import SudokuFinishedCartel from '../SudokuFinishedCartel/SudokuFinishedCartel';

export default function Sudoku({ editableBoard, initialBoard, setSelectedCell }) {
	const [sudokuFinished, setSudokuFinished] = useState(false);
	const [focusedCell, setFocusedCell] = useState({ row: null, col: null });

	const handleCellClick = useCallback((row, col) => {
		setSelectedCell({ row, col });
		setFocusedCell({ row, col });
	}, [setSelectedCell]);

	const boardCheck = async () => {
		try {
			const boardValues = editableBoard.map(row => row.map(cell => cell.value));
			const response = await fetch('/api/check-solution', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(boardValues),
			});
			if (!response.ok)
				throw new Error('Network response was not ok');
			const ok = await response.json();
			if (ok.isCorrect) {
				setHighlightedCell({ row: null, col: null });
				setSudokuFinished(true);
			} else {
				console.log('Solution is incorrect. Try again!');
			}
		} catch (error) {
			console.error("Error checking the board: ", error);
		}
	}

	useEffect(() => {
		if (editableBoard.every(row => row.every(cell => cell.value !== 0))) {
			boardCheck();
		}
	}, [editableBoard]);

	const highlightedCells = useMemo(() => {
		if (focusedCell.row === null || focusedCell.col === null) return new Set();

		const boxRowStart = Math.floor(focusedCell.row / 3) * 3;
		const boxColStart = Math.floor(focusedCell.col / 3) * 3;
		const highlightSet = new Set();

		for (let i = 0; i < 9; i++) {
			if (i !== focusedCell.col) {
				highlightSet.add(`${focusedCell.row}-${i}`);
			}
			if (i !== focusedCell.row) {
				highlightSet.add(`${i}-${focusedCell.col}`);
			}
		}

		for (let i = boxRowStart; i < boxRowStart + 3; i++) {
			for (let j = boxColStart; j < boxColStart + 3; j++) {
				if (!(i === focusedCell.row && j === focusedCell.col)) {
					highlightSet.add(`${i}-${j}`);
				}
			}
		}

		return highlightSet;
	}, [focusedCell]);

	const isHighlighted = (row, col) => {
		return highlightedCells.has(`${row}-${col}`);
	};

	return (
		<div className={styles.allContainer}>
			<table className={styles.sudokuTable}>
				<tbody>
					{editableBoard.map((row, rowIndex) => (
						<tr key={rowIndex} className={styles.column}>
							{row.map((cell, colIndex) => {
								const isInitialValue = initialBoard[rowIndex][colIndex] !== 0;
								const cellClasses = `
									${styles.cell} 
									${isInitialValue ? styles.initial : styles.editable}
									${isHighlighted(rowIndex, colIndex) ? styles.highlight : ''}
                 					${focusedCell.row === rowIndex && focusedCell.col === colIndex ? styles.focused : ''}								
								`;

								return (
									<td key={colIndex} className={`${styles.box} p-0`}>
										<div
											id={`${rowIndex}-${colIndex}`}
											className={cellClasses}
											tabIndex='0'
											onClick={() => handleCellClick(rowIndex, colIndex)}
										>
											{cell.value !== 0 ? (
												cell.value
											) : (
												cell.notes.length > 0 ? (
													<div className={styles.notes}>
														{Array.from({ length: 9 }, (_, i) => (
															<span key={i} className={styles.note}>
																{cell.notes.includes(i + 1) ? i + 1 : ''}
															</span>
														))}
													</div>
												) : ''
											)}

										</div>
									</td>
								);
							})}
						</tr>
					))}
				</tbody>
			</table>
			{sudokuFinished ? <SudokuFinishedCartel /> : ""}
		</div>
	)
}