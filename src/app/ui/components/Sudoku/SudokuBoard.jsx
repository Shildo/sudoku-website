"use client";

import styles from './SudokuBoard.module.scss';
import { useEffect, useState } from 'react';

export default function SudokuBoard({ board }) {
	const [sudokuGrid, setSudokuGrid] = useState(board);

	useEffect(() => {
		setSudokuGrid(board);
	}, [board]);

	const handleKeyDown = (event) => {
		const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];
		const key = event.key;

		if ((!/[1-9]/.test(key) && !allowedKeys.includes(key))) {
			event.preventDefault();
		}
	};

	return (
		<table className={styles.sudokuTable}>
			<tbody>
				{Array.from({ length: 9 }, (_, row) => (
					<tr className={styles.box} key={row} id={`row-${row + 1}`}>
						{Array.from({ length: 9 }, (_, col) => (
							<td className={`${styles.column} p-0`} key={col}>
								{
									sudokuGrid[row][col] === 0 ? (
										<input
											value={sudokuGrid[row][col] === 0 ? "" : sudokuGrid[row][col]}
											id={`${row}-${col}`}
											className={styles.cell}
											size="2"
											maxLength="1"
											onKeyDown={handleKeyDown}
											onChange={(e) => handleChange(e, row, col)}
										/>
									) : (
										<input
											value={sudokuGrid[row][col]}
											id={`${row}-${col}`}
											className={`${styles.cell} font-bold text-numbersDefault`}
											readOnly
											size="2"
											maxLength="1"
										/>
									)
								}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
}
