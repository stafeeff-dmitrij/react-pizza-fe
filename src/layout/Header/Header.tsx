import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';

import CartLink from '../../components/CartLink/CartLink.tsx';
import Search from '../../components/Search/Search.tsx';
import { AppDispatch } from '../../redux/store.ts';
import { clearFilterParams } from '../../redux/slices/pizzasSlice/pizzasSlice.ts';

import styles from './Header.module.scss';


/**
 * @component
 * @description Шапка сайта
 */
function Header() {

	// текущий путь
	const { pathname } = useLocation();

	const dispatch = useDispatch<AppDispatch>();

	return (
		<div className={cn('container', styles['header'])}>
			{/* сброс параметров фильтрации при клике на логотип и переходе на главную */}
			<Link to="/" onClick={() => dispatch(clearFilterParams())}>
				<div className={styles['logo']}>
					<img className={styles['logo-image']} src="/images/icons/pizza-logo.svg" alt="Pizza logo"/>
					<div className={styles['logo-text']}>
						<h1 className={styles['title']}>React Pizza</h1>
						<p className={styles['description']}>самая вкусная пицца во вселенной</p>
					</div>
				</div>
			</Link>
			{/* выводим поиск только на главной */}
			{pathname === '/'&&  <Search/>}
			{/* выводим ссылку на корзину только на главной и детальной странице товаров */}
			{(pathname === '/' || pathname.includes('/pizza')) && <CartLink/>}
		</div>
	);
}

export default Header;