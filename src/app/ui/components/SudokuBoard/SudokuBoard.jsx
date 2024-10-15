"use client"

import { useCallback, useEffect, useState } from 'react';
import styles from './SudokuBoard.module.scss'
import SudokuFinishedCartel from '../SudokuFinishedCartel/SudokuFinishedCartel';

export default function Sudoku({ editableBoard, initialBoard, setSelectedCell, handleCellUpdate, isNotesMode }) {

	const [focusedCell, setFocusedCell] = useState({ row: null, col: null });
	const [sudokuFinished, setSudokuFinished] = useState(false);

	const handleKeyDown = useCallback((event, row, col) => {
		const key = event.key;
		if (/[1-9]/.test(key)) {
			handleCellUpdate(row, col, parseInt(key));
		} else if (key === 'Backspace' || key === 'Delete') {
			handleCellUpdate(row, col, 0);
		}
	}, [handleCellUpdate]);

	const handleCellClick = useCallback((row, col) => {
		setSelectedCell({ row, col });
		setFocusedCell({ row, col });
	}, [setSelectedCell]);

	const boardCheck = async () => {
		try {
			const boardValues = editableBoard.map(row => row.map(cell => cell.value));
			const response = await fetch('/api/board-check', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(boardValues),
			});
			if (!response.ok)
				throw new Error('Network response was not ok');
			const ok = await response.json();
			if (ok)
				setSudokuFinished(true);
		} catch (error) {
			console.error("Error checking the board: ", error);
			alert("Failed check the Sudoku board. Please try again.");
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
								const isFocused = focusedCell && focusedCell.row === rowIndex && focusedCell.col === colIndex;
								const cellClasses = `${styles.cell} ${isInitialValue ? styles.initial : styles.editable} ${isFocused ? styles.focused : ''}`;

								return (
									<td key={colIndex} className={`${styles.box} p-0`}>
										<div
											id={`${rowIndex}-${colIndex}`}
											className={cellClasses}
											tabIndex={!isInitialValue ? 0 : ''}
											onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
											onClick={() => handleCellClick(rowIndex, colIndex)}
										>
											{isNotesMode && cell.notes.length > 0 ? (
												<div className={styles.notes}>
													{Array.from({ length: 9 }, (_, i) => (
														<div key={i} className={styles.note}>
															{cell.notes.includes(i + 1) ? i + 1 : ''}
														</div>
													))}
												</div>
											) : (
												cell.value !== 0 ? cell.value : ''
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