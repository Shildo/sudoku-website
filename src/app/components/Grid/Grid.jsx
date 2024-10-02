import styles from './Grid.module.scss';
import Square from "../square/Square";

export default function Grid({ numbers }) {
	return (
		<table className={styles.Grid}>
			<tbody>
				{numbers.map((row, rowIndex) => (
					<tr key={rowIndex}>
						{row.map((number, colIndex) => (
							<Square value={number} key={colIndex} />
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
}
