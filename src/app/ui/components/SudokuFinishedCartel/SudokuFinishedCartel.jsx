import LabelSvg from '@/public/svg/LabelSvg'
import styles from './SudokuFinishedCartel.module.scss'

export default function SudokuFinishedCartel() {
	return (
		<div className={styles.sudokuFinishedCartel}>
			<div className={styles.labelContainer}>
				<LabelSvg className={styles.message}>
					<span>Congratulations</span>
				</LabelSvg>
			</div>

		</div>
	)
}