import { baseApi } from './baseApi.ts';


// типизация получаемых данных о категориях с бэка
export interface CategoryApiProps {
	id: number,
	name: string,
}

/**
 * @function
 * @description Получение и кэширование всех категорий
 */
export const categoryApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		// CategoryApiProps[] - типизация возвращаемых данных
		// void - типизация входящих параметров - нет входящих параметров
		getCategories: builder.query<CategoryApiProps[], void>({
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

// наименование хука для дальнейшего вызова метода по запросу категорий с бэка называется как определенные выше функция getCategories
// плюс use вначале и Query в конце
export const { useGetCategoriesQuery } = categoryApi;