"use client"

import { useCallback, useEffect, useState } from 'react';
import styles from './SudokuBoard.module.scss'
import SudokuFinishedCartel from '../SudokuFinishedCartel/SudokuFinishedCartel';

export default function Sudoku({ editableBoard, initialBoard, setSelectedCell, handleCellUpdate, eraseNumber }) {
	const [sudokuFinished, setSudokuFinished] = useState(false);
	const [focusedCell, setFocusedCell] = useState({ row: null, col: null });

	const handleKeyDown = useCallback((event, row, col) => {
		const key = event.key;
		const number = parseInt(key);

		if (/[1-9]/.test(key)) {
			handleCellUpdate(row, col, number);

		} else if (key === 'Backspace' || key === 'Delete') {
			handleCellUpdate(row, col, 0);
			eraseNumber();
		} else if (key === 'Tab') {
			const cellElement = document.getElementById(`${row}-${col}`);
			if (cellElement) {
				cellElement.focus();
			}
		}
	}, [editableBoard, handleCellUpdate]);

	const handleCellClick = useCallback((row, col) => {
		setSelectedCell({ row, col });

		const cellElement = document.getElementById(`${row}-${col}`);
		if (cellElement) {
			cellElement.focus();
		}
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
				document.activeElement.blur();
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

	useEffect(() => {
		if (focusedCell.row === null || focusedCell.col === null) return;

		const highlightCells = () => {
			const boxRowStart = Math.floor(focusedCell.row / 3) * 3;
			const boxColStart = Math.floor(focusedCell.col / 3) * 3;

			for (let i = 0; i < 9; i++) {
				if (i !== focusedCell.col) {
					document.getElementById(`${focusedCell.row}-${i}`).classList.add(styles.highlight);
				}
				if (i !== focusedCell.row) {
					document.getElementById(`${i}-${focusedCell.col}`).classList.add(styles.highlight);
				}
			}

			for (let i = boxRowStart; i < boxRowStart + 3; i++) {
				for (let j = boxColStart; j < boxColStart + 3; j++) {
					if (!(i === focusedCell.row && j === focusedCell.col)) {
						document.getElementById(`${i}-${j}`).classList.add(styles.highlight);
					}
				}
			}
		};

		const removeHighlight = () => {
			for (let i = 0; i < 9; i++) {
				document.getElementById(`${focusedCell.row}-${i}`).classList.remove(styles.highlight);
				document.getElementById(`${i}-${focusedCell.col}`).classList.remove(styles.highlight);
			}

			const boxRowStart = Math.floor(focusedCell.row / 3) * 3;
			const boxColStart = Math.floor(focusedCell.col / 3) * 3;
			for (let i = boxRowStart; i < boxRowStart + 3; i++) {
				for (let j = boxColStart; j < boxColStart + 3; j++) {
					document.getElementById(`${i}-${j}`).classList.remove(styles.highlight);
				}
			}
		};

		removeHighlight();
		highlightCells();

		return () => removeHighlight();
	}, [focusedCell]);

	const handleFocus = (row, col) => {
		setFocusedCell({ row, col });
	};

	const handleBlur = () => {
		setFocusedCell({ row: null, col: null });
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
									${focusedCell.row === rowIndex && focusedCell.col === colIndex ? styles.focused : ''}
								`;

								return (
									<td key={colIndex} className={`${styles.box} p-0`}>
										<div
											id={`${rowIndex}-${colIndex}`}
											className={cellClasses}
											tabIndex='0'
											onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
											onClick={() => handleCellClick(rowIndex, colIndex)}
											onFocus={() => handleFocus(rowIndex, colIndex)}
											onBlur={() => handleBlur()}
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