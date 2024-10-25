import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import getEnvVariables from '../../helpers/envVariables.ts';
import { PizzaWithPaginationData } from '../../pages/Main/Main.props.ts';
import { RootState } from '../store.ts';
import { setCurrentPage } from '../slices/pizzasSlice/pizzasSlice.ts';
import { SortTypeKey } from '../../components/Sorting/Sorting.props.ts';


// типизации отправляемых данных на бэк для фильтрации пицц
export interface FilterData {
	sort_type: SortTypeKey;
	size: number;
	page?: number;
	category_id?: number;
	search?: string;
}


// переменные окружения
const envVariables = getEnvVariables();

// асинхронный action (действие) на запрос данных о пиццах
export const fetchPizzas = createAsyncThunk(
	// уникальное наименование action для внутренней работы redux
	'pizza/fetchPizzas',
	async (params: FilterData, thunkAPI) => {
		try {
			const { data } = await axios.get<PizzaWithPaginationData>(
				`${envVariables.BASE_URL}/pizzas`,
				{ params: params }
			);
			// текущее состояние в redux
			const state = thunkAPI.getState() as RootState;
			// меняем номер текущей страницы на 1, если для текущего номера не пришло никаких данных по пиццам
			if (data.items.length === 0 && state.pizza.currentPage > 1) {
				console.log('Нет пицц, повтор запроса для 1 страницы')
				// после обновления состояния идет повторный запрос в компоненте Main
				thunkAPI.dispatch(setCurrentPage(1));
			}
			return data;
		} catch (error) {
			if (error instanceof AxiosError) {
				// пробрасываем наверх ошибку, передав в нее возможный текст сообщение из ответа сервера
				// текст ошибки сохранится в action.error.message
				throw new Error(error.response?.data.detail);
			}
			// чтобы TS не ругался, вернем объект ошибки через rejectWithValue во всех остальных случаях
			console.error(error);
			// возвращаем объект ошибки (будет доступен в rejected в action)
			return thunkAPI.rejectWithValue(error);
		}
	},
);