import { useEffect, useState } from 'react';
import cn from 'classnames';
import axios, { AxiosError } from 'axios';

import Title from '../../components/Title/Title.tsx';
import Categories from '../../components/Categories/Categories.tsx';
import Sorting from '../../components/Sorting/Sorting.tsx';
import getEnvVariables from '../../helpers/envVariables.ts';
import { Pizza } from '../../interfaces/pizza.interface.ts';
import VerticalCardLoader from '../../components/Loader/VerticalCardLoader.tsx';
import VerticalCard from '../../components/Cards/VerticalCard/VerticalCard.tsx';

import styles from './Main.module.scss';


/**
 * @component
 * @description Главная страница с товарами
 */
function Main() {

	// переменные окружения
	const envVariables = getEnvVariables();

	const [isLoading, setIsLoading] = useState(false);
	const [pizzas, setPizzas] = useState<Pizza[]>([]);

	// получение товаров с возможностью фильтрации по категории
	const getProducts = async (categoryId?: number) => {
		try {
			// устанавливаем флаг загрузки
			setIsLoading(true);
			const { data } = await axios.get<Pizza[]>(`${envVariables.BASE_URL}/pizzas`, {
				// передаем необязательный параметр categoryId
				// т.к. название ключа и параметра совпадают, можно просто указать один раз name, вместо name: name
				params: {
					category_id: categoryId,
				}
			});
			setPizzas(data);
			// меняем флаг, что загрузка завершена
			setIsLoading(false);
			// 	перехват ошибки, если с бэка придет невалидный JSON
		} catch (error) {
			// проверяем тип ошибки
			if (error instanceof AxiosError) {
				// сохраняем текст ошибки в состояние
				alert(error.message);
			}
			// меняем флаг загрузки
			setIsLoading(false);
			return;
		}
	};

	useEffect(() => {
		getProducts();
	}, []);

	return (
		<div className={cn('container', styles['main'])}>
			<div className={styles['top-block']}>
				<Categories/>
				<Sorting/>
			</div>
			<Title>Все пиццы</Title>
			<div className={styles['products']}>
				{isLoading
					? [...new Array(6)].map((_, index) => <VerticalCardLoader key={index} />)
					: pizzas.map(pizza => <VerticalCard key={pizza.id} {...pizza} />
				)}
			</div>
		</div>
	);
}

export default Main;