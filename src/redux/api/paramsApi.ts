import { baseApi } from './baseApi.ts';
import { DoughType, setDoughTypes, setSizes, Size } from '../slices/paramsSlice.ts';


/**
 * @function
 * @description Получение параметров пицц: типы теста и размеры пицц
 */
export const paramsApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		// получение и сохранение типов теста для пицц
		// DoughType[] - типизация возвращаемых данных
		// void - типизация входящих параметров - нет входящих параметров
		getDoughTypes: builder.query<DoughType[], void>({
			query: () => `/dough_types`,
			// после выполнения запроса сохраняем данные в хранилище Redux
			onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
				try {
					const { data } = await queryFulfilled;
					dispatch(setDoughTypes(data)); // Сохраняем данные о типах теста в Redux
				} catch (error) {
					console.error(error);
				}
			},
			providesTags: ['doughTypes'],
		}),
		// получение и сохранение размеров пицц
		// DoughType[] - типизация возвращаемых данных
		// void - типизация входящих параметров - нет входящих параметров
		getSizes: builder.query<Size[], void>({
			query: () => `/sizes`,
			// после выполнения запроса сохраняем данные в хранилище Redux
			onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
				try {
					const { data } = await queryFulfilled;
					dispatch(setSizes(data)); // Сохраняем данные о размерах пицц в Redux
				} catch (error) {
					console.error(error);
				}
			},
			providesTags: ['sizes'],
		}),
	}),
});

// наименование хука для дальнейшего вызова метода по запросу категорий с бэка называется как определенные выше функция getDoughTypes
// плюс use вначале и Query в конце
export const { useGetDoughTypesQuery, useGetSizesQuery } = paramsApi;