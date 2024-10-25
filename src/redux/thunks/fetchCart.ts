import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import getEnvVariables from '../../helpers/envVariables.ts';
import { ProductInCard } from '../../components/Cards/HorizontalCard/HorizontalCard.props.ts';


// переменные окружения
const envVariables = getEnvVariables();

// асинхронный action (действие) на запрос данных о товарах в корзине
export const fetchCart = createAsyncThunk(
	// уникальное наименование action для внутренней работы redux
	'cart/fetchCart',
	async (_, thunkAPI) => {
		try {
			const { data } = await axios.get<ProductInCard[]>(
				`${envVariables.BASE_URL}/cart`
			);
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