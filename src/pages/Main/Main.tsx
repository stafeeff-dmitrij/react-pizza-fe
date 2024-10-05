import cn from 'classnames';

import Title from '../../components/Title/Title.tsx';
import Categories from '../../components/Categories/Categories.tsx';
import Sorting from '../../components/Sorting/Sorting.tsx';
import VerticalCard from '../../components/Cards/VerticalCard/VerticalCard.tsx';

import styles from './Main.module.scss';


/**
 * @component
 * @description Главная страница с товарами
 */
function Main() {
	return (
		<div className={cn('container', styles['main'])}>
			<div className={styles['top-block']}>
				<Categories/>
				<Sorting/>
			</div>
			<Title>Все пиццы</Title>
			<div className={styles['products']}>
				<VerticalCard title="Чизбургер-пицца" price={395} />
				<VerticalCard title="Чизбургер-пицца" price={395} />
				<VerticalCard title="Чизбургер-пицца" price={395} />
				<VerticalCard title="Чизбургер-пицца" price={395} />
				<VerticalCard title="Чизбургер-пицца" price={395} />
				<VerticalCard title="Чизбургер-пицца" price={395} />
			</div>
		</div>
	);
}

export default Main;