import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import getEnvVariables from '../../../helpers/envVariables.ts';


// переменные окружения
const envVariables = getEnvVariables();

// асинхронный action (действие) для очистки корзины
export const clearCart = createAsyncThunk(
	// уникальное наименование action для внутренней работы redux
	'cart/clearCart',
	async (_, thunkAPI) => {
		try {
			await axios.delete(`${envVariables.BASE_URL}/cart`);
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