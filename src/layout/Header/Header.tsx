import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import CartLink from '../../components/CartLink/CartLink.tsx';
import Search from '../../components/Search/Search.tsx';
import { clearFilterParams } from '../../redux/slices/filterSlice.ts';
import { AppDispatch } from '../../redux/store.ts';

import styles from './Header.module.scss';


/**
 * @component
 * @description Шапка сайта
 */
function Header() {

	const dispatch = useDispatch<AppDispatch>()

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
			<Search/>
			<CartLink/>
		</div>
	);
}

export default Header;