import Link from 'next/link';
import styles from './NavBar.module.scss';
import GithubSvg from '@/public/svg/GithubSvg';
import CustomButton from '../CustomButton/CustomButton';

export default function NavBar() {
	return (
		<nav className={styles.navBar}>
			<Link href='/' className={styles.sudokuWebsite}>
				Sudoku-website
			</Link>
			<CustomButton className={styles.gitButton}>
				<Link href='https://github.com/Shildo/sudoku-website' className={styles.githubLink}>
					Github
					<GithubSvg />
				</Link>
			</CustomButton>
		</nav>
	)
}