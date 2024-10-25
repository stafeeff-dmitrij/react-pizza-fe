import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import getEnvVariables from '../../../helpers/envVariables.ts';
import { ProductInCard } from '../../../components/Cards/HorizontalCard/HorizontalCard.props.ts';
import { removePizza } from '../../slices/cartSlice/cartSlice.ts';


// переменные окружения
const envVariables = getEnvVariables();

// асинхронный action (действие) для удаления товара из корзины
export const deletePizza = createAsyncThunk(
	// уникальное наименование action для внутренней работы redux
	'cart/deletePizza',
	async (pizza: ProductInCard, thunkAPI) => {
		try {
			await axios.delete(`${envVariables.BASE_URL}/cart/${pizza.id}`);
			// т.к. delete метод с бэка не возвращает удаленную запись, сразу здесь вручную вызываем метод removePizza для удаления товара из состояния в redux,
			// передав объект из параметров
			thunkAPI.dispatch(removePizza(pizza));
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