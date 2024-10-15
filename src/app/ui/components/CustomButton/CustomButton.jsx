"use client"

import styles from './CustomButton.module.scss';
import { useState } from 'react';

export default function CustomButton({ className, children, id = null, ...props }) {
	const [isPressed, setIsPressed] = useState(false);
	const classes = `${styles.customButton} ${className || ""} ${isPressed ? styles.pressed : ''}`;

	const handleMouseDown = () => setIsPressed(true);
	const handleMouseUp = () => setIsPressed(false);
	const handleTouchStart = () => setIsPressed(true);
	const handleTouchEnd = () => setIsPressed(false);

	return (
		<button
			className={classes}
			id={id}
			{...props}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			onTouchStart={handleTouchStart}
			onTouchEnd={handleTouchEnd}
		>
			{children}
		</button>
	)
}