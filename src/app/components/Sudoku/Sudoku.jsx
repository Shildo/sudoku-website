"use client";

import styles from './Sudoku.module.scss';

export default function Sudoku({ board }) {

	const { value } = board;

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
				{
					Array.from({ length: 9 }, (_, row) => (
						<tr className={styles.box} key={row}>
							{Array.from({ length: 9 }, (_, col) => (
								<td key={col} className={`${styles.column} p-0`}>
									{
										value[row][col] === 0 ? (
											<input
												id={`${row}-${col}`}
												className={styles.cell}
												size='2'
												maxLength='1'
												onKeyDown={handleKeyDown}
											/>
										) : (
											<input
												value={value[row][col]}
												id={`${row}-${col}`}
												className={`${styles.cell} font-medium`}
												readOnly
												size='2'
												maxLength='1'
											/>
										)
									}
								</td>
							))}
						</tr>
					))
				}
			</tbody>
		</table >
	)
}
