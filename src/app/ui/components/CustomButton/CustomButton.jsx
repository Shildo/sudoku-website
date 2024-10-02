import styles from './CustomButton.module.scss';

export default function CustomButton({ className, children, id = null }) {
	const classes = `${styles.customButton} ${className || ""}`;

	return (
		<button className={classes} id={id}>
			{children}
		</button>
	)
}