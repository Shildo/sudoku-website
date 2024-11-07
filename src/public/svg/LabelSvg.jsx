export default function Label({ children }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 300 100"
			width="100%"
			height="15%"
			preserveAspectRatio="none"
		>
			<polygon
				points="0,10 300,10 280,50 300,90 0,90 20,50"
				fill="#588157"
			/>

			<foreignObject x="0" y="10" width="300" height="80">
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						width: '100%',
						height: '100%',
						color: 'white',
					}}
				>
					{children}
				</div>
			</foreignObject>
		</svg>
	);
}
