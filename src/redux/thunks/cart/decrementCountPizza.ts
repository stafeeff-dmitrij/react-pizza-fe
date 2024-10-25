import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import getEnvVariables from '../../../helpers/envVariables.ts';
import { ProductInCard } from '../../../components/Cards/HorizontalCard/HorizontalCard.props.ts';
import { decrementPizza, removePizza } from '../../slices/cartSlice/cartSlice.ts';


// переменные окружения
const envVariables = getEnvVariables();

// асинхронный action (действие) для удаления товара из корзины
export const decrementCountPizza = createAsyncThunk(
	// уникальное наименование action для внутренней работы redux
	'cart/decrementCountPizza',
	async (pizza: ProductInCard, thunkAPI) => {
		try {
			const { data } = await axios.delete<ProductInCard | null>(`${envVariables.BASE_URL}/cart/${pizza.id}`, {
				params: {
					one_record: true
				}
			});
			// если данные пришли, значит товар еше остался в корзине, просто уменьшилось его кол-во
			// соответственно уменьшаем его кол-во в redux
			if (data) {
				thunkAPI.dispatch(decrementPizza(data));
			// в противном случае товар полностью удален из корзины,
			// соответственно удаляем его из redux
			} else {
				thunkAPI.dispatch(removePizza(pizza));
			}
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