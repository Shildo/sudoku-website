"use client";

import styles from './SudokuBoard.module.scss';
import { useEffect, useState } from 'react';

export default function SudokuBoard({ board, number }) {
	const [sudokuGrid, setSudokuGrid] = useState(board);

	useEffect(() => {
		setSudokuGrid(board);
	}, [board]);

	useEffect(() => {
		const clickableCells = document.querySelectorAll('.clickeable');
		clickableCells.forEach(cell => {
			cell.addEventListener('click', function () {
				console.log('clicked');
			});
		});

		return () => {
			clickableCells.forEach(cell => {
				cell.removeEventListener('click', function () {
					console.log('clicked');
				});
			});
		};
	}, []);

	const handleKeyDown = (event, row, col) => {
		const allowedKeys = ['Backspace', 'Tab', 'Delete'];
		const key = event.key;

		if (/[1-9]/.test(key)) {

			const newGrid = [...sudokuGrid].map(row => [...row]);
			newGrid[row][col] = parseInt(key);
			setSudokuGrid(newGrid);
		} else if (allowedKeys.includes(key)) {
			const newGrid = [...sudokuGrid].map(row => [...row]);
			if (key === 'Backspace' || key === 'Delete') {
				newGrid[row][col] = 0;
			}
			setSudokuGrid(newGrid);
		} else {
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
								<div
									id={`cell-${row + 1}-${col + 1}`}
									className={`${styles.cell} ${board[row][col] === 0 ? 'clickeable' : 'font-bold text-numbersDefault'}`}
									tabIndex={`${board[row][col] === 0 ? '0' : ''}`}
									onKeyDown={(e) => handleKeyDown(e, row, col)}
								>
									{sudokuGrid[row][col] !== 0 ? sudokuGrid[row][col] : ''}
								</div>
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
}
