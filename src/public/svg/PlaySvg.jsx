export default function PlaySvg(props) {
	return (
		<svg
			width={20}
			height={20}
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<g clipPath="url(#clip0_27_2)">
				<path
					d="M17.828 8.387L4.078.257C2.961-.402 1.25.239 1.25 1.872v16.254c0 1.465 1.59 2.348 2.828 1.613l13.75-8.125c1.227-.722 1.23-2.504 0-3.226z"
					fill="#E0E1DD"
				/>
			</g>
			<defs>
				<clipPath id="clip0_27_2">
					<path fill="#fff" d="M0 0H20V20H0z" />
				</clipPath>
			</defs>
		</svg>
	)
}