"use client"

import styles from './Interacteables.module.scss';

import { useEffect, useState } from 'react';
import { useStopwatch } from 'react-timer-hook';

import CustomButton from '../CustomButton/CustomButton';
import OptionButton from '../OptionButton/OptionButton';
import Timer from '../Timer/Timer';
import PencilSvg from '@/public/svg/PencilSvg';
import PauseSvg from '@/public/svg/PauseSvg';
import PlaySvg from '@/public/svg/PlaySvg';
import RedoSvg from '@/public/svg/RedoSvg';
import TrashSvg from '@/public/svg/TrashSvg';

export default function Interacteables({ loading, selectedCell, handleCellUpdate, fetchNewBoard }) {
	const [isPaused, setIsPaused] = useState(false);

	const { hours, minutes, seconds, reset, pause, start } = useStopwatch({ autoStart: false });

	useEffect(() => {
		if (!loading) {
			start();
			setIsPaused(false);
		} else {
			pause();
		}
	}, [loading]);

	useEffect(() => {
		if (isPaused) {
			pause();
		} else {
			start();
		}
	}, [isPaused]);

	const options = [
		{
			"name": "restart-button",
			"icon": <RedoSvg />,
			"text": "Restart"
		},
		{
			"name": "erase-button",
			"icon": <TrashSvg />,
			"text": "Erase"
		},
		{
			"name": "notes-button",
			"icon": <PencilSvg />,
			"text": "Notes"
		}
	]

	const handleNumpadClick = (number) => {
		if (selectedCell.row !== null && selectedCell.col !== null) {
			handleCellUpdate(selectedCell.row, selectedCell.col, number);
		}
	};

	const handleNewGame = () => {
		setIsPaused(false);
		reset();
		try {
			fetchNewBoard();
		} catch (e) {
			alert('Error fetching board: ', e)
		}
	}

	return (
		<div className={styles.interacteables}>

			<div className={styles.options}>
				<div className={styles.timerAndNewGameContainer}>
					<Timer hours={hours} minutes={minutes} seconds={seconds} />
					<CustomButton className={`${styles.newGameButton} ${loading ? 'opacity-50' : null}`} disabled={loading} onClick={() => handleNewGame()}>
						New game
					</CustomButton>
				</div>
				<div className={styles.optionButtons}>
					<div className={styles.boardOptionsContainer}>
						{isPaused ?
							<OptionButton className={styles.option} aria-label="play-button" icon={<PlaySvg />} text={"Play"} onClick={() => setIsPaused(false)} />
							:
							<OptionButton className={styles.option} aria-label="pause-button" icon={<PauseSvg />} text={"Pause"} onClick={() => setIsPaused(true)} />
						}

						{options.map((data, index) => (
							<OptionButton className={styles.option} aria-label={data.name} key={index} icon={data.icon} text={data.text} />
						))}
					</div>
				</div>

			</div>

			<div className={styles.numpad}>
				{Array.from({ length: 9 }, (_, i) => (
					<CustomButton name={i + 1} key={i + 1} className={styles.number} onClick={() => handleNumpadClick(i + 1)}>
						{i + 1}
					</CustomButton>
				))}
			</div>
		</div>
	);
}
