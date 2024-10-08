import { useEffect, useState } from 'react';
import cn from 'classnames';

import { CategoriesProps } from './Categories.props.ts';
import { categoriesConst } from '../../helpers/mock-data/categories.ts';

import styles from './Categories.module.scss';


/**
 * @component
 * @description Блок с категориями товаров
 */
function Categories() {

	const [activeIndex, setActiveIndex] = useState<number>(0);
	const [categories, setCategories] = useState<CategoriesProps[]>(categoriesConst);

	const onClickLink = (categoryId: number) => {
		setActiveIndex(categoryId);
	};

	// добавляем все категории с полученным
	useEffect(() => {
		setCategories([{
			id: 0,
			name: 'Все'
		}, ...categories])
	}, [])

	return (
		<ul className={styles['categories-list']}>
			{categories.map(category =>
				<li
					key={category.id}
					className={cn(styles['categories-item'], {
						[styles['active']]: category.id === activeIndex,
					})}
					onClick={() => onClickLink(category.id)}
				>
					{category.name}
				</li>
			)}
		</ul>
	);
}

export default Categories;