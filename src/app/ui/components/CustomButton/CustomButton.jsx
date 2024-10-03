import styles from './CustomButton.module.scss';

export default function CustomButton({ className, children, id = null, ...props }) {
	const classes = `${styles.customButton} ${className || ""}`;

	return (
		<button className={classes} id={id} {...props}>
			{children}
		</button>
	)
}