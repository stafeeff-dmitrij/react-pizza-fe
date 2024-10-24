import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import qs from 'qs';

import { AppDispatch, RootState } from '../../redux/store.ts';
import { fetchPizzas, setFilterParams } from '../../redux/slices/pizzasSlice.ts';
import Title from '../../components/Title/Title.tsx';
import Categories from '../../components/Categories/Categories.tsx';
import Sorting from '../../components/Sorting/Sorting.tsx';
import VerticalCardLoader from '../../components/Loader/VerticalCardLoader.tsx';
import VerticalCard from '../../components/Cards/VerticalCard/VerticalCard.tsx';
import Pagination from '../../components/Pagination/Pagination.tsx';
import { getQueryString } from '../../utils/url.ts';
import { FilterUrlData } from './Main.props.ts';
import { getParamsForRequest, getParamsForStore, ParsedUrlData } from '../../utils/filterParams.ts';

import styles from './Main.module.scss';


/**
 * @component
 * @description Главная страница с товарами
 */
function Main() {

	// для добавления параметров фильтрации в URL
	const navigate = useNavigate();
	// флаг для отслеживания наличия параметров в URL, чтобы не делать лишние запросы на бэк при первичной отрисовке компонента со стандартными значениями параметров
	// и повторной перерисовкой с параметрами из URL
	const isSearch = useRef(false);

	// достаем из хранилища нужные данные
	const {
		categoryId,
		sortType,
		searchValue,
		currentPage,
		pizzas,
		isLoading,
		errorMessage
	} = useSelector((state: RootState) => state.pizza);
	// функция для вызова методов для изменения состояния
	const dispatch = useDispatch<AppDispatch>();

	// TODO Попробовать сделать через useParams
	// парсинг параметров фильтрации из URL
	useEffect(() => {
		// если в URL есть параметры
		if (window.location.search) {
			// через parse преобразуем строку с параметрами в объект с соответствующими ключами и значениями
			// предварительно убираем из строки первый символ - знак вопроса
			const params: FilterUrlData = qs.parse(window.location.search.substring(1));
			// дополняем объект значением сортировки, преобразуем в правильному типу
			const fullParams: ParsedUrlData = getParamsForStore(params);
			// сохранение параметров в redux
			dispatch(setFilterParams(fullParams));
			// меняем флаг
			isSearch.current = true;
		}
	}, []);

	// получение пицц при изменении параметров фильтрации
	useEffect(() => {
		// делаем запрос со стандартными данными из redux только, если не идет поиск товаров по параметрам из URL
		// таким образом избавляемся от лишнего запроса на бэк
		if (!isSearch.current) {
			const params = getParamsForRequest(categoryId, searchValue, sortType.key, currentPage);
			dispatch(fetchPizzas(params));
		}
		// меняем флаг
		isSearch.current = false;
	}, [categoryId, sortType, searchValue, currentPage]);

	// TODO Попробовать сделать через useParams
	// добавление параметров фильтрации в URL
	useEffect(() => {
		const queryString: string = getQueryString(categoryId, searchValue, sortType.key, currentPage);
		// дополняем текущий URL сгенерированной строкой с параметрами фильтрации (не забываем вначале ставить знак ?)
		navigate(`?${queryString}`);
	}, [categoryId, searchValue, sortType.key, currentPage]);

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
				{!isLoading && errorMessage && <p>Ошибка при загрузке товаров!</p>}
				{!isLoading && !errorMessage && !pizzas.length && <p>Товаров не найдено...</p>}
				{isLoading
					? [...new Array(6)].map((_, index) => <VerticalCardLoader key={index}/>)
					: pizzas.map(pizza => <VerticalCard key={pizza.pizza_id} {...pizza} />
					)}
			</div>
			<Pagination/>
		</div>
	);
}

export default Main;