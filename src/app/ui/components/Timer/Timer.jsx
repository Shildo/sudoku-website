import styles from './Timer.module.scss'
import EyeShowSvg from '@/public/svg/EyeSvg'
import EyeSlashSvg from '@/public/svg/EyeSlashSvg'
import CustomButton from '../CustomButton/CustomButton'
import { useState } from 'react'

export default function Timer({ hours, minutes, seconds }) {
	const [isVisible, setIsVisible] = useState(true);

	return (
		<div className={styles.timerContainer}>
			<div className={`${styles.timer} ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
				<span className={styles.timerDigit}>{hours.toString().padStart(2, '0')[0]}</span>
				<span className={styles.timerDigit}>{hours.toString().padStart(2, '0')[1]}</span>
				<span>:</span>
				<span className={styles.timerDigit}>{minutes.toString().padStart(2, '0')[0]}</span>
				<span className={styles.timerDigit}>{minutes.toString().padStart(2, '0')[1]}</span>
				<span>:</span>
				<span className={styles.timerDigit}>{seconds.toString().padStart(2, '0')[0]}</span>
				<span className={styles.timerDigit}>{seconds.toString().padStart(2, '0')[1]}</span>
			</div>
			<CustomButton className={styles.eyesSvgs} onClick={() => setIsVisible(!isVisible)} aria-label={isVisible ? "Hide timer" : "Show timer"}>
				{isVisible ? <EyeShowSvg /> : <EyeSlashSvg />}
			</CustomButton>
		</div>
	)
} 