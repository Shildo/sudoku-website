import { montserrat } from "./fonts";
import "./globals.css";

export const metadata = {
	title: "Sudoku",
	description: "Meet my sudoku app project",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${montserrat.className} antialiased`}>
				{children}
			</body>
		</html>
	);
}
