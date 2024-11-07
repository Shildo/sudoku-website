"use client"

import { useCallback, useEffect, useState, useMemo } from 'react';
import styles from './SudokuBoard.module.scss'
import SudokuFinishedCartel from '../SudokuFinishedCartel/SudokuFinishedCartel';
import { checkSolution } from '@/app/lib/boardFunctions';

export default function SudokuBoard({ editableBoard, initialBoard, setSelectedCell, selectedCell }) {
	const [sudokuFinished, setSudokuFinished] = useState(false);

	const handleCellClick = useCallback((row, col) => {
		setSelectedCell({ row, col });
	}, [setSelectedCell]);

	const boardCheck = () => {

		const boardValues = editableBoard.map(row => row.map(cell => cell.value));

		if (checkSolution(boardValues)) {
			setSelectedCell({ row: null, col: null });
			setSudokuFinished(true);
		} else {
			console.log('Solution is incorrect. Try again!');
		}
	}

	useEffect(() => {
		if (editableBoard.every(row => row.every(cell => cell.value !== 0))) {
			boardCheck();
		}
	}, [editableBoard]);

	const highlightedCells = useMemo(() => {
		if (selectedCell.row === null || selectedCell.col === null) return new Set();

		const boxRowStart = Math.floor(selectedCell.row / 3) * 3;
		const boxColStart = Math.floor(selectedCell.col / 3) * 3;
		const highlightSet = new Set();

		for (let i = 0; i < 9; i++) {
			if (i !== selectedCell.col) {
				highlightSet.add(`${selectedCell.row}-${i}`);
			}
			if (i !== selectedCell.row) {
				highlightSet.add(`${i}-${selectedCell.col}`);
			}
		}

		for (let i = boxRowStart; i < boxRowStart + 3; i++) {
			for (let j = boxColStart; j < boxColStart + 3; j++) {
				if (!(i === selectedCell.row && j === selectedCell.col)) {
					highlightSet.add(`${i}-${j}`);
				}
			}
		}

		return highlightSet;
	}, [selectedCell]);

	const isHighlighted = (row, col) => {
		return highlightedCells.has(`${row}-${col}`);
	};

	return (
		<div className={styles.allContainer}>
			<table className={styles.sudokuTable}>
				<tbody>
					{editableBoard.map((row, rowIndex) => (
						<tr key={rowIndex} className={styles.row}>
							{row.map((cell, colIndex) => {
								const isInitialValue = initialBoard[rowIndex][colIndex] !== 0;
								const cellClasses = `
									${styles.cell} 
									${isInitialValue ? styles.initial : styles.editable}							
								`;
								const boxClasses = `
									${styles.box} 
									${isHighlighted(rowIndex, colIndex) ? styles.highlight : ''}
                 					${selectedCell.row === rowIndex && selectedCell.col === colIndex ? styles.focused : ''}
									p-0
								`

								return (
									<td key={colIndex} className={boxClasses}>
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