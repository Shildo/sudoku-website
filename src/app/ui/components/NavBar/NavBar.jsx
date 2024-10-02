import Link from 'next/link';
import styles from './NavBar.module.scss';
import GithubSvg from '@/public/svg/GithubSvg';
import CustomButton from '../CustomButton/CustomButton';

export default function NavBar() {
	return (
		<nav className={styles.navBar}>
			<a href='/' className={styles.sudokuWebsite}>
				Sudoku-website
			</a>
			<CustomButton className={styles.gitButton}>
				<Link href='https://github.com/Shildo/sudoku-website' className={styles.githubLink}>
					Github
					<GithubSvg />
				</Link>
			</CustomButton>
		</nav>
	)
}