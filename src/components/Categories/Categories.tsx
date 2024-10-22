import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios, { AxiosError } from 'axios';
import cn from 'classnames';

import { AppDispatch } from '../../redux/store.ts';
import { selectFilter, setCategoryId } from '../../redux/slices/filterSlice.ts';
import getEnvVariables from '../../helpers/envVariables.ts';
import { CategoriesProps } from './Categories.props.ts';
import CategoriesLoader from '../Loader/CategoriesLoader.tsx';

import styles from './Categories.module.scss';


/**
 * @component
 * @description Блок с категориями товаров
 */
function Categories() {

	// переменные окружения
	const envVariables = getEnvVariables();

	// достаем из хранилища id текущей выбранной категории
	const { categoryId } = useSelector(selectFilter)
	// функция для вызова методов для изменения состояния
	const dispatch = useDispatch<AppDispatch>()

	const [categories, setCategories] = useState<CategoriesProps[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

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
			const { data } = await axios.get<CategoriesProps[]>(`${envVariables.BASE_URL}/categories`);
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
		dispatch(setCategoryId(categoryId))
	};

	return (
		<ul className={styles['categories-list']}>
			{isLoading && [...new Array(5)].map((_, index) => <CategoriesLoader key={index} />)}
			{!isLoading && categories.map(category =>
				<li
					key={category.id}
					className={cn(styles['categories-item'], {
						[styles['active']]: category.id === categoryId,
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