import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import axios, { AxiosError } from 'axios';

import { AppDispatch, RootState } from '../../redux/store.ts';
import Title from '../../components/Title/Title.tsx';
import Categories from '../../components/Categories/Categories.tsx';
import Sorting from '../../components/Sorting/Sorting.tsx';
import getEnvVariables from '../../helpers/envVariables.ts';
import { FilterData, Pizza, PizzaWithPaginationData } from '../../interfaces/pizza.interface.ts';
import VerticalCardLoader from '../../components/Loader/VerticalCardLoader.tsx';
import VerticalCard from '../../components/Cards/VerticalCard/VerticalCard.tsx';
import { setCurrentPage, SortTypeKey } from '../../redux/slices/filterSlice.ts';
import Pagination from '../../components/Pagination/Pagination.tsx';

import styles from './Main.module.scss';


/**
 * @component
 * @description Главная страница с товарами
 */
function Main() {

	// переменные окружения
	const envVariables = getEnvVariables();

	// достаем из хранилища нужные данные
	const { categoryId, sortType, searchValue, currentPage } = useSelector((state: RootState) => state.filter);
	// функция для вызова методов для изменения состояния
	const dispatch = useDispatch<AppDispatch>()

	const [isLoading, setIsLoading] = useState(false);
	const [pizzas, setPizzas] = useState<Pizza[]>([]);

	// общее кол-во страниц с пиццами
	const [totalPageCount, setTotalPageCount] = useState<number>(1);

	// получение товаров с возможностью фильтрации по категории
	const getProducts = async (sortKey: SortTypeKey, categoryId?: number, searchValue?: string) => {
		try {
			// устанавливаем флаг загрузки
			setIsLoading(true);

			// динамически формируем объект с параметрами в зависимости от переданных необязательных параметров
			const params: FilterData = {
				sort_type: sortKey,
				size: 8,
				page: currentPage,
			};
			if (categoryId) {
				params.category_id = categoryId;
			}
			if (searchValue) {
				params.search = searchValue;
			}

			const { data } = await axios.get<PizzaWithPaginationData>(
				`${envVariables.BASE_URL}/pizzas`,
				{params: params}
			);

			// исправление бага, когда, н-р, для 3 страницы не возвращаются товары (т.к. нет столько товаров)
			// делается повторный запрос с теми же условиями, но для 1 страницы
			if (!data.items.length && currentPage != 1) {
				console.warn(`Для страницы №${currentPage} нет товаров. Обновление текущего запроса для страницы №1`)
				dispatch(setCurrentPage(1));
			}

			// сохраняем пиццы в состояние
			setPizzas(data.items);
			// сохраняем кол-во страниц из данных о пагинации с бэка
			setTotalPageCount(data.pages)
			// меняем флаг, что загрузка завершена
			setIsLoading(false);
			// 	перехват ошибки, если с бэка придет невалидный JSON
		} catch (error) {
			// проверяем тип ошибки
			if (error instanceof AxiosError) {
				// выводим текст ошибки с бэка, если есть
				alert(error.response?.data.detail);
			}
			// меняем флаг загрузки
			setIsLoading(false);
			return;
		}
	};

	useEffect(() => {
		getProducts(sortType.key, categoryId, searchValue);
	}, [categoryId, sortType, searchValue, currentPage]);

	return (
		<div className={cn('container', styles['main'])}>
			<div className={styles['top-block']}>
				<Categories/>
				<Sorting/>
			</div>
			{searchValue
				? <Title>Пиццы: {searchValue}</Title>
				: <Title>Все пиццы</Title>
			}
			<div className={styles['products']}>
				{isLoading
					? [...new Array(6)].map((_, index) => <VerticalCardLoader key={index}/>)
					: pizzas.map(pizza => <VerticalCard key={pizza.id} {...pizza} />
					)}
			</div>
			<Pagination
				pageCount={totalPageCount}
			/>
		</div>
	);
}

export default Main;