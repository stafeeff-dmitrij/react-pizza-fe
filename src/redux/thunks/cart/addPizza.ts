import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import getEnvVariables from '../../../helpers/envVariables.ts';
import { ProductInCard } from '../../../components/Cards/HorizontalCard/HorizontalCard.props.ts';
import { size, type } from '../../slices/paramsSlice/paramsSlice.props.ts';


// типизация отправляемых данных на бэк для добавления товара в корзину
interface AddProductInCartData {
	pizzaId: number;
	typeId: type;
	sizeId: size;
}

// переменные окружения
const envVariables = getEnvVariables();

// асинхронный action (действие) для добавления товара в корзину
export const addPizza = createAsyncThunk(
	// уникальное наименование action для внутренней работы redux
	'cart/addPizza',
	async ({ pizzaId, typeId, sizeId }: AddProductInCartData, thunkAPI) => {
		try {
			const { data } = await axios.post<ProductInCard>(`${envVariables.BASE_URL}/cart`, {
				pizza_id: pizzaId,
				type_id: typeId,
				size_id: sizeId,
			});
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