import { baseApi } from './baseApi.ts';
import { Pizza } from '../../components/Cards/VerticalCard/VerticalCard.props.ts';


// типизации получаемых данных о пицце для детальной страницы с бэка
// наследуясь от интерфейса Pizza наследуем все его поля
export interface PizzaDetail extends Pizza {
	description: string;
}

/**
 * @function
 * @description Получение пиццы по id
 */
export const pizzaApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		// PizzaDetail - типизация возвращаемых данных
		// string - типизация входящих параметров - id пиццы
		getPizzaById: builder.query<PizzaDetail, string | undefined>({
			query: (id) => {
				if (id === undefined) {
					throw new Error('Некорректный id пиццы для запроса данных');
				}
				return `/pizzas/${id}`;
			},
			providesTags: ['pizza'],
		}),
	}),
});

// наименование хука для дальнейшего вызова метода по запросу категорий с бэка называется как определенные выше функция getPizzaById
// плюс use вначале и Query в конце
export const { useGetPizzaByIdQuery } = pizzaApi;