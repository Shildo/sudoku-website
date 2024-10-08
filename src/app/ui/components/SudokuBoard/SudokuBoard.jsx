"use client"

import styles from './SudokuBoard.module.scss'

export default function Sudoku({ editableBoard, initialBoard, setSelectedCell, handleCellUpdate }) {
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
	};

	return (
		<table className={styles.sudokuTable}>
			<tbody>
				{editableBoard.map((row, rowIndex) => (
					<tr key={rowIndex} className={styles.box}>
						{row.map((value, colIndex) => {
							const isInitialValue = initialBoard[rowIndex][colIndex] !== 0;
							const cellClasses = `${styles.cell} ${isInitialValue ? styles.initial : styles.editable}`;

							return (
								<td key={colIndex} className={`${styles.column} p-0`}>
									<div
										id={`${rowIndex}-${colIndex}`}
										className={cellClasses}
										tabIndex={!isInitialValue ? 0 : ''}
										onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
										onClick={() => handleCellClick(rowIndex, colIndex)}
									>
										{value !== 0 ? value : ''}
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
