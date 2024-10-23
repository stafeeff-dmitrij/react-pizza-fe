import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import { AppDispatch } from '../../redux/store.ts';
import { useGetCategoriesQuery } from '../../redux/api/categoryApi.ts';
import { selectFilter, setCategoryId } from '../../redux/slices/filterSlice.ts';
import CategoriesLoader from '../Loader/CategoriesLoader.tsx';

import styles from './Categories.module.scss';


/**
 * @component
 * @description Блок с категориями товаров
 */
function Categories() {

	// запрос данных о категориях
	const { data, isSuccess , isLoading, isError, error } = useGetCategoriesQuery([]);

	// достаем из хранилища id текущей выбранной категории
	const { categoryId } = useSelector(selectFilter)
	// функция для вызова методов для изменения состояния
	const dispatch = useDispatch<AppDispatch>()

	useEffect(() => {
		if (isError) {
			console.error(error);
			alert('При получении категорий произошла ошибка')
		}
	}, [isError, error]);

	// сохранение активной категории
	const onClickLink = (categoryId: number) => {
		dispatch(setCategoryId(categoryId))
	};

	return (
		<ul className={styles['categories-list']}>
			{isLoading && [...new Array(5)].map((_, index) => <CategoriesLoader key={index} />)}
			{isSuccess && data.map(category =>
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