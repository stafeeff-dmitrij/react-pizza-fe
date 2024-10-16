import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import axios, { AxiosError } from 'axios';

import { RootState } from '../../redux/store.ts';
import Title from '../../components/Title/Title.tsx';
import Categories from '../../components/Categories/Categories.tsx';
import Sorting from '../../components/Sorting/Sorting.tsx';
import getEnvVariables from '../../helpers/envVariables.ts';
import { Pizza } from '../../interfaces/pizza.interface.ts';
import VerticalCardLoader from '../../components/Loader/VerticalCardLoader.tsx';
import VerticalCard from '../../components/Cards/VerticalCard/VerticalCard.tsx';
import { SortTypeKey } from '../../redux/slices/filterSlice.ts';

import styles from './Main.module.scss';


/**
 * @component
 * @description Главная страница с товарами
 */
function Main() {

	// переменные окружения
	const envVariables = getEnvVariables();

	// достаем из хранилища id текущей выбранной категории
	const { categoryId, sortType } = useSelector((state: RootState) => state.filter);

	const [isLoading, setIsLoading] = useState(false);
	const [pizzas, setPizzas] = useState<Pizza[]>([]);

	// получение товаров с возможностью фильтрации по категории
	const getProducts = async (categoryId?: number, sortKey?: SortTypeKey) => {
		try {
			// устанавливаем флаг загрузки
			setIsLoading(true);
			const { data } = await axios.get<Pizza[]>(`${envVariables.BASE_URL}/pizzas`, {
				// передаем необязательный параметр categoryId
				// т.к. название ключа и параметра совпадают, можно просто указать один раз name, вместо name: name
				params: {
					category_id: categoryId,
					sort_type: sortKey,
				}
			});
			setPizzas(data);
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
		if (categoryId != 0) {
			getProducts(categoryId, sortType.key);
		} else {
			getProducts(undefined, sortType.key);
		}
	}, [categoryId, sortType]);

	return (
		<div className={cn('container', styles['main'])}>
			<div className={styles['top-block']}>
				<Categories/>
				<Sorting/>
			</div>
			<Title>Все пиццы</Title>
			<div className={styles['products']}>
				{isLoading
					? [...new Array(6)].map((_, index) => <VerticalCardLoader key={index}/>)
					: pizzas.map(pizza => <VerticalCard key={pizza.id} {...pizza} />
					)}
			</div>
		</div>
	);
}

export default Main;