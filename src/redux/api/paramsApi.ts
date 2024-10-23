import { baseApi } from './baseApi.ts';
import { DoughType, setDoughTypes, setSizes, Size } from '../slices/paramsSlice.ts';


/**
 * @function
 * @description Получение параметров пицц: типы теста и размеры пицц
 */
export const paramsApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		// получение и сохранение типов теста для пицц
		getDoughTypes: builder.query<DoughType[], []>({
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
		getSizes: builder.query<Size[], []>({
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
			providesTags: ['Sizes'],
		}),
	}),
});

// наименование хука для дальнейшего вызова метода по запросу категорий с бэка называется произвольно
// главное, чтобы в названии было use... и ...Query
export const { useGetDoughTypesQuery, useGetSizesQuery } = paramsApi;