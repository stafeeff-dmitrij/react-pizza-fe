import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import cn from 'classnames';
import axios, { AxiosError } from 'axios';
import qs from 'qs';

import { AppDispatch, RootState } from '../../redux/store.ts';
import { fetchPizzas } from '../../redux/slices/pizzasSlice.ts';
import Title from '../../components/Title/Title.tsx';
import Categories from '../../components/Categories/Categories.tsx';
import Sorting from '../../components/Sorting/Sorting.tsx';
import getEnvVariables from '../../helpers/envVariables.ts';
import { FilterData } from '../../interfaces/pizza.interface.ts';
import VerticalCardLoader from '../../components/Loader/VerticalCardLoader.tsx';
import VerticalCard from '../../components/Cards/VerticalCard/VerticalCard.tsx';
import { selectFilter, setCurrentPage, setFilterParams } from '../../redux/slices/filterSlice.ts';
import Pagination from '../../components/Pagination/Pagination.tsx';
import { getQueryString } from '../../utils/url.ts';
import { FilterUrlData, ParsedUrlData } from './Main.props.ts';
import { getFilterData } from '../../utils/filterData.ts';
import { clearCart, setCart } from '../../redux/slices/cartSlice.ts';
import { HorizontalCardProps } from '../../components/Cards/HorizontalCard/HorizontalCard.props.tsx';

import styles from './Main.module.scss';


/**
 * @component
 * @description Главная страница с товарами
 */
function Main() {

	// переменные окружения
	const envVariables = getEnvVariables();
	// для добавления параметров фильтрации в URL
	const navigate = useNavigate();
	// флаг для отслеживания наличия параметров в URL, чтобы не делать лишние запросы на бэк при первичной отрисовке компонента со стандартными значениями параметров
	// и повторной перерисовкой с параметрами из URL
	const isSearch = useRef(false);

	// достаем из хранилища нужные данные по фильтрации
	// вместо useSelector((state: RootState) => state.filter) вызываем селектор, в котором хранится стрелочная функция
	const { categoryId, sortType, searchValue, currentPage } = useSelector(selectFilter);
	// достаем из хранилища данные по пиццам
	const { pizzas, isLoading, errorMessage } = useSelector((state: RootState) => state.pizza);
	// функция для вызова методов для изменения состояния
	const dispatch = useDispatch<AppDispatch>();

	// общее кол-во страниц с пиццами
	const [totalPageCount, setTotalPageCount] = useState<number>(1);

	// получение товаров с возможностью фильтрации по категории
	const getProducts = async () => {
		// динамически формируем объект с параметрами в зависимости от переданных необязательных параметров
		const params: FilterData = {
			sort_type: sortType.key,
			size: 8,
			page: currentPage,
		};
		if (categoryId) {
			params.category_id = categoryId;
		}
		if (searchValue) {
			params.search = searchValue;
		}

		dispatch(fetchPizzas(params));

		// TODO Поправить!!!
		// исправление бага, когда, н-р, для 3 страницы не возвращаются товары (т.к. нет столько товаров)
		// делается повторный запрос с теми же условиями, но для 1 страницы
		// if (!data.items.length && currentPage != 1) {
		// 	console.warn(`Для страницы №${currentPage} нет товаров. Обновление текущего запроса для страницы №1`);
		// 	dispatch(setCurrentPage(1));
		// }

		// сохраняем кол-во страниц из данных о пагинации с бэка
		// setTotalPageCount(data.pages);
	};

	const getCart = async () => {
		try {
			const { data } = await axios.get<HorizontalCardProps[]>(`${envVariables.BASE_URL}/cart`);
			// очистка старых данных в корзине
			dispatch(clearCart());
			// сохраняем корзину в состояние
			dispatch(setCart(data));
		} catch (error) {
			if (error instanceof AxiosError) {
				alert(error.response?.data.detail);
			}
		}
	};

	// парсинг параметров фильтрации из URL
	useEffect(() => {
		// если в URL есть параметры
		if (window.location.search) {
			// через parse преобразуем строку с параметрами в объект с соответствующими ключами и значениями
			// предварительно убираем из строки первый символ - знак вопроса
			const params: FilterUrlData = qs.parse(window.location.search.substring(1));
			// дополняем объект значением сортировки, преобразуем в правильному типу
			const fullParams: ParsedUrlData = getFilterData(params);
			// сохранение параметров в redux
			dispatch(setFilterParams(fullParams));
			// меняем флаг
			isSearch.current = true;
		}
	}, []);

	// получение пицц при изменении категории, типа сортировки, страницы и поиска по названию
	useEffect(() => {
		// делаем запрос со стандартными данными из redux только, если не идет поиск товаров по параметрам из URL
		// таким образом избавляемся от лишнего запроса на бэк
		if (!isSearch.current) {
			getProducts();
		}
		// меняем флаг
		isSearch.current = false;

	}, [categoryId, sortType, searchValue, currentPage]);

	// добавление параметров фильтрации в URL
	useEffect(() => {
		const queryString: string = getQueryString(categoryId, searchValue, sortType.key, currentPage);
		// дополняем текущий URL сгенерированной строкой с параметрами фильтрации (не забываем вначале ставить знак ?)
		navigate(`?${queryString}`);
	}, [categoryId, sortType, searchValue, currentPage]);

	// получение товаров в корзине
	useEffect(() => {
		getCart();
	}, []);

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
				{errorMessage && !isLoading && <p>Ошибка при загрузке товаров!</p> }
				{isLoading
					? [...new Array(6)].map((_, index) => <VerticalCardLoader key={index}/>)
					: pizzas.map(pizza => <VerticalCard key={pizza.pizza_id} {...pizza} />
					)}
			</div>
			<Pagination
				pageCount={totalPageCount}
			/>
		</div>
	);
}

export default Main;