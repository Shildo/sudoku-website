import EyeSvg from '@/public/svg/EyeSvg';
import CustomButton from '../CustomButton/CustomButton';
import styles from './Interacteables.module.scss';
import EyeSlashSvg from '@/public/svg/EyeSlashSvg';

export default function Interacteables() {
	return (
		<div className={styles.interacteables}>
			<div className={styles.options}>
				<div className={styles.timer}>
					<h4>Time <br />00:20:00</h4>
					<CustomButton className={styles.eyesSvgs}>
						<EyeSvg />
						{/* <EyeSlashSvg /> */}
					</CustomButton>
				</div>
				<div className={styles.optionButtons}>
					<CustomButton className={styles.newGameButton}>
						New game
					</CustomButton>

				</div>
			</div>

			<div className={styles.numpad}>
				{Array.from({ length: 9 }, (_, i) => (
					<CustomButton id={i + 1} className={styles.number}>
						{i + 1}
					</CustomButton>
				))}
			</div>
		</div>
	)
}