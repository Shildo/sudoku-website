import styles from '../Sudoku/SudokuBoard.module.scss';
import { useEffect } from 'react';

export default function SecondSudoku({ editableBoard, setSelectedCell, handleCellUpdate }) {

	useEffect(() => {
		const cells = document.querySelectorAll('.cell');

		let classes = `${styles.cell} `;
		cells.forEach((cell) => {
			if (cell.textContent === '') {
				cell.tabIndex = 0;
				classes += `${styles.editable}`;
			} else {
				classes += `${styles.initial}`;
			}
			cell.className = classes;
			classes = `${styles.cell} `;
		});
	}, []);

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
						{row.map((value, colIndex) => (
							<td key={colIndex} className={`${styles.column} p-0`}>
								<div
									id={`${rowIndex}-${colIndex}`}
									className={`cell`}
									onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
									onClick={() => handleCellClick(rowIndex, colIndex)}
								>
									{value !== 0 ? value : ''}
								</div>
							</td>
						))}
					</tr>
				))}
			</tbody>
		</ table >
	);
}