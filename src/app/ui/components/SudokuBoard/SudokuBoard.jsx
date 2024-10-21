"use client"

import { useCallback, useEffect, useState } from 'react';
import styles from './SudokuBoard.module.scss'
import SudokuFinishedCartel from '../SudokuFinishedCartel/SudokuFinishedCartel';

export default function Sudoku({ editableBoard, initialBoard, setSelectedCell, handleCellUpdate, eraseNumber }) {
	const [sudokuFinished, setSudokuFinished] = useState(false);

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
			console.log(ok);
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
								`;

								return (
									<td key={colIndex} className={`${styles.box} p-0`}>
										<div
											id={`${rowIndex}-${colIndex}`}
											className={cellClasses}
											tabIndex={!isInitialValue ? 0 : ''}
											onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
											onClick={() => handleCellClick(rowIndex, colIndex)}
										>
											{cell.value !== 0 ? (
												cell.value
											) : (
												cell.notes.length > 0 ? (
													<div className={styles.notes}>
														{Array.from({ length: 9 }, (_, i) => (
															<div key={i} className={styles.note}>
																{cell.notes.includes(i + 1) ? i + 1 : ''}
															</div>
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