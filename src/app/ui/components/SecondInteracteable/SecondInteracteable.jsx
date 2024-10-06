import styles from '../Interacteables/Interacteables.module.scss';

export default function SecondInteracteables({ selectedCell, handleCellUpdate, fetchNewBoard }) {
	const handleNumpadClick = (number) => {
		if (selectedCell.row !== null && selectedCell.col !== null) {
			handleCellUpdate(selectedCell.row, selectedCell.col, number);
		}
	};

	return (
		<div>
			<div className="numpad">
				{Array.from({ length: 9 }, (_, i) => (
					<button key={i + 1} onClick={() => handleNumpadClick(i + 1)}>
						{i + 1}
					</button>
				))}
			</div>
			<button onClick={fetchNewBoard}>New Game</button>
		</div>
	);
}
