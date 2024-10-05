import cn from 'classnames';

import styles from './Categories.module.scss';


/**
 * @component
 * @description Блок с категориями товаров
 */
function Categories() {
	return (
		<ul className={styles['categories-list']}>
			<li className={cn(styles['categories-item'], styles['active'])}>Все</li>
			<li className={styles['categories-item']}>Мясные</li>
			<li className={styles['categories-item']}>Вегетарианская</li>
			<li className={styles['categories-item']}>Гриль</li>
			<li className={styles['categories-item']}>Острые</li>
			<li className={styles['categories-item']}>Закрытые</li>
		</ul>
	);
}

export default Categories;