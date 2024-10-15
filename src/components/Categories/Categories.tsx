import { useEffect, useState } from 'react';
import cn from 'classnames';
import axios, { AxiosError } from 'axios';

import { Pizza } from '../../interfaces/pizza.interface.ts';
import getEnvVariables from '../../helpers/envVariables.ts';
import { CategoriesProps } from './Categories.props.ts';

import styles from './Categories.module.scss';
import CategoriesLoader from '../Loader/CategoriesLoader.tsx';


/**
 * @component
 * @description Блок с категориями товаров
 */
function Categories() {

	// переменные окружения
	const envVariables = getEnvVariables();

	const [activeIndex, setActiveIndex] = useState<number>(0);
	const [categories, setCategories] = useState<CategoriesProps[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	// добавляем все категории к полученным
	const addAllCategory = (categories: CategoriesProps[]) => {
		categories.unshift({
			id: 0,
			name: 'Все'
		});
		return categories;
	};

	const getCategories = async () => {
		try {
			setIsLoading(true);
			const { data } = await axios.get<Pizza[]>(`${envVariables.BASE_URL}/categories`);
			const allData: CategoriesProps[] = addAllCategory(data);
			setCategories(allData);
			setIsLoading(false);
		} catch (error) {
			if (error instanceof AxiosError) {
				alert(error.message);
			}
			setIsLoading(false);
			return;
		}
	};

	useEffect(() => {
		getCategories();
	}, []);

	const onClickLink = (categoryId: number) => {
		setActiveIndex(categoryId);
	};

	return (
		<ul className={styles['categories-list']}>
			{isLoading && [...new Array(5)].map((_, index) => <CategoriesLoader key={index} />)}
			{!isLoading && categories.map(category =>
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