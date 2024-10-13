"use client"

import { useState } from 'react';
import styles from './SudokuBoard.module.scss'

export default function Sudoku({ editableBoard, initialBoard, setSelectedCell, handleCellUpdate, isNotesMode }) {

	const [focusedCell, setFocusedCell] = useState({ row: null, col: null });

	const handleKeyDown = (event, row, col) => {
		const key = event.key;
		if (/[1-9]/.test(key)) {
			handleCellUpdate(row, col, parseInt(key));
		} else if (key === 'Backspace' || key === 'Delete') {
			handleCellUpdate(row, col, 0);
		}
	};
	const handleCellClick = (row, col) => {
		setSelectedCell({ row, col });
		setFocusedCell({ row, col });
	};

	return (
		<table className={styles.sudokuTable}>
			<tbody>
				{editableBoard.map((row, rowIndex) => (
					<tr key={rowIndex} className={styles.box}>
						{row.map((cell, colIndex) => {
							const isInitialValue = initialBoard[rowIndex][colIndex] !== 0;
							const isFocused = focusedCell && focusedCell.row === rowIndex && focusedCell.col === colIndex;
							const cellClasses = `${styles.cell} ${isInitialValue ? styles.initial : styles.editable} ${isFocused ? styles.focused : ''}`;

							return (
								<td key={colIndex} className={`${styles.column} p-0`}>
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
	);
}