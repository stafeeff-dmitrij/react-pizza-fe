import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import getEnvVariables from '../../../helpers/envVariables.ts';
import { CategoryApiProps } from './categoryApi.props.ts';


// переменные окружения
const envVariables = getEnvVariables();

// получение всех категорий
export const categoryApi = createApi({
	reducerPath: 'categoriesApi',
	baseQuery: fetchBaseQuery({ baseUrl: `${envVariables.BASE_URL}` }),
	endpoints: (builder) => ({
		getCategories: builder.query<CategoryApiProps[], []>({
			query: () => `/categories`,
			// после получения данных из нельзя просто так изменить в компоненте, однако это можно сделать
			// через transformResponse (в данном случае добавляем нулевую категорию "Все", которой нет на бэке)
			transformResponse: (categories: CategoryApiProps[]) => {
				categories.unshift({
					id: 0,
					name: 'Все'
				});
				return categories;
			},
		}),
	}),
});

// наименование хука для дальнейшего вызова метода по запросу категорий с бэка называется произвольно
// главное, чтобы в названии было use... и ...Query
export const { useGetCategoriesQuery } = categoryApi;