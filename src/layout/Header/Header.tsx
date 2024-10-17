import { Link } from 'react-router-dom';
import cn from 'classnames';

import CartLink from '../../components/CartLink/CartLink.tsx';
import Search from '../../components/Search/Search.tsx';

import styles from './Header.module.scss';



/**
 * @component
 * @description Шапка сайта
 */
function Header() {
	return (
		<div className={cn('container', styles['header'])}>
			<Link to="/">
				<div className={styles['logo']}>
					<img className={styles['logo-image']} src="/images/icons/pizza-logo.svg" alt="Pizza logo"/>
					<div className={styles['logo-text']}>
						<h1 className={styles['title']}>React Pizza</h1>
						<p className={styles['description']}>самая вкусная пицца во вселенной</p>
					</div>
				</div>
			</Link>
			<Search/>
			<CartLink/>
		</div>
	);
}

export default Header;