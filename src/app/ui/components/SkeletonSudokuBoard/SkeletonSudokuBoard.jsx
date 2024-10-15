import styles from '../SudokuBoard/SudokuBoard.module.scss';

export default function SkeletonSudokuBoard() {
	return (
		<table className={`${styles.sudokuTable} bg-black opacity-50`}>
			<tbody>
				{
					Array.from({ length: 9 }, (_, row) => (
						<tr className={styles.column} key={row} id={`row-${row + 1}`}>
							{Array.from({ length: 9 }, (_, col) => (
								<td className={`${styles.box} p-0`} key={col}>
									<input className={styles.cell} disabled />
								</td>
							))}
						</tr>
					))
				}
			</tbody>
		</table >
	)
}