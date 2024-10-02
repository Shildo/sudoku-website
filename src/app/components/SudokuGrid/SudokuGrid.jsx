"use client"

import styles from './SudokuGrid.module.scss';
import Grid from "../Grid/Grid";

export default function SudokuGrid({ board }) {
	const { value } = board;

	const blockSize = 3;

	const getBlock = (rowIndex, colIndex) => {
		const block = [];
		for (let i = rowIndex * blockSize; i < (rowIndex + 1) * blockSize; i++) {
			const row = [];
			for (let j = colIndex * blockSize; j < (colIndex + 1) * blockSize; j++) {
				row.push(value[i][j]);
			}
			block.push(row);
		}
		return block;
	};

	return (
		<div className={styles.SudokuContainer}>
			{Array.from({ length: blockSize }).map((_, rowIndex) => (
				<div className={styles.row} key={rowIndex}>
					{Array.from({ length: blockSize }).map((_, colIndex) => (
						<Grid key={colIndex} numbers={getBlock(rowIndex, colIndex)} />
					))}
				</div>
			))}
		</div>
	);
}
