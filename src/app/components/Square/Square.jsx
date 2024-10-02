import styles from './Square.module.scss';

export default function Square({ value }) {

	const handleKeyDown = (event) => {
		const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];
		const key = event.key;

		if ((!/[1-9]/.test(key) && !allowedKeys.includes(key))) {
			event.preventDefault();
		}
	};

	return (
		<td className={styles.td}>
			{value === 0 ? (
				<input
					className={styles.input}
					size='2'
					maxLength='1'
					onKeyDown={handleKeyDown}
				/>
			) : (
				<input
					value={value}
					className={styles.input}
					readOnly
					size='2'
					maxLength='1'
				/>
			)}
		</td>
	);
}
