"use client"

import styles from './Interacteables.module.scss';
import CustomButton from '../CustomButton/CustomButton';
import EyeSvg from '@/public/svg/EyeSvg';
import EyeSlashSvg from '@/public/svg/EyeSlashSvg';
import PencilSvg from '@/public/svg/PencilSvg';
import PauseSvg from '@/public/svg/PauseSvg';
import PlaySvg from '@/public/svg/PlaySvg';
import RedoSvg from '@/public/svg/RedoSvg';
import TrashSvg from '@/public/svg/TrashSvg';
import OptionButton from '../OptionButton/OptionButton';
import { useState, useEffect } from 'react';
import { useStopwatch } from 'react-timer-hook';

export default function Interacteables({ fetchNeWBoard }) {

	const [isVisible, setIsVisible] = useState(true);
	const [isPaused, setIsPaused] = useState(false)

	const { seconds, minutes, hours, start, pause, reset } = useStopwatch({ autoStart: true });

	useEffect(() => {
		if (isPaused) {
			pause();
		} else {
			start();
		}
	}, [isPaused]);

	const options = [
		{
			"icon": <RedoSvg />,
			"text": "Restart"
		},
		{
			"icon": <TrashSvg />,
			"text": "Erase"
		},
		{
			"icon": <PencilSvg />,
			"text": "Notes"
		}
	]

	return (
		<div className={styles.interacteables}>
			<div className={styles.options}>
				<div className={styles.timerContainer}>
					<div>
						<h4>Time</h4>
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
					</div>
					<CustomButton className={styles.eyesSvgs} onClick={() => setIsVisible(!isVisible)}>
						{isVisible ? <EyeSvg /> : <EyeSlashSvg />}
					</CustomButton>
				</div>

				<div className={styles.optionButtons}>
					<CustomButton className={styles.newGameButton} onClick={() => { fetchNeWBoard(); reset(); setIsPaused(false) }}>
						New game
					</CustomButton>
					<div className={styles.boardOptionsContainer}>
						{isPaused ?
							<OptionButton icon={<PlaySvg />} text={"Play"} onClick={() => setIsPaused(false)} />
							:
							<OptionButton icon={<PauseSvg />} text={"Pause"} onClick={() => setIsPaused(true)} />
						}

						{options.map((data, index) => (
							<OptionButton key={index} icon={data.icon} text={data.text} />
						))}
					</div>
				</div>
			</div>

			<div className={styles.numpad}>
				{Array.from({ length: 9 }, (_, i) => (
					<CustomButton id={i + 1} key={i + 1} className={styles.number}>
						{i + 1}
					</CustomButton>
				))}
			</div>
		</div>
	)
}