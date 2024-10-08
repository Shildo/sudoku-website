import CustomButton from '../CustomButton/CustomButton';
import styles from './OptionButton.module.scss'

export default function OpenButton({ className, icon, text = null, ...props }) {

	const classes = `${styles.optionButtonContainer} ${className || ""}`;

	return (
		<div className={classes}>
			<CustomButton className={styles.optionButton} {...props}>
				{icon}
			</CustomButton>
			<span>{text}</span>
		</div>
	)
}