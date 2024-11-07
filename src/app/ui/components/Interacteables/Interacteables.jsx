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
import TrashSvg from '@/public/svg/TrashSvg';

export default function Interacteables({ loading, selectedCell, handleCellUpdate, fetchNewBoard, boardOptions, isNotesMode, isPaused, setIsPaused }) {

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
		} else if (!loading) {
			start();
		}
	}, [isPaused]);

	const handleNumpadClick = (number) => {
		if (selectedCell.row !== null && selectedCell.col !== null) {
			handleCellUpdate(selectedCell.row, selectedCell.col, number);
		}
	};

	const handleNewGame = () => {
		setIsPaused(false);
		reset();
		fetchNewBoard();
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
						<OptionButton className={styles.option} aria-label="erase-button" icon={<TrashSvg />} text="Erase" onClick={boardOptions.eraseNumber} />
						<div className={styles.notesContainer}>
							<div className={`${styles.cartel} ${isNotesMode ? styles.cartelActive : ''}`}>{isNotesMode ? 'On' : 'Off'}</div>
							<OptionButton className={styles.option} aria-label="notes-button" icon={<PencilSvg />} text="Notes" onClick={boardOptions.takeNotes} />
						</div>

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
