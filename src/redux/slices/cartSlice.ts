import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { RootState } from '../store.ts';
import getEnvVariables from '../../helpers/envVariables.ts';


// TODO Вынести типизацию в отдельный файл рядом со слайсом
// размеры пицц
export type size = 'small' | 'average' | 'big';
// тип теста пицц
export type type = 'slim' | 'traditional';

// типизация данных об позиции с пиццей в корзине
export interface CardPositionProps {
	id: number;
	pizza_id: number;
	name: string;
	image: string;
	price: number;
	size_id: size;
	type_id: type;
	count: number;
}

// типизация начального состояния с данными о пиццах в корзине
export interface cartState {
	pizzas: CardPositionProps[];
	totalCount: number;
	totalPrice: number;
	isLoading: boolean;
	errorMessage?: string;
}

// начальное состояние
const initialState: cartState = {
	pizzas: [],
	totalCount: 0,
	totalPrice: 0,
	isLoading: false,
	errorMessage: '',
};

// переменные окружения
const envVariables = getEnvVariables();

// асинхронный action (действие) на запрос данных о товарах в корзине
export const fetchCart = createAsyncThunk(
	// уникальное наименование action для внутренней работы redux
	'cart/fetchCart',
	async (_, thunkAPI) => {
		try {
			const { data } = await axios.get<CardPositionProps[]>(
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

export const cartSlice = createSlice({
	// уникальное название слайса (отображается в devtools)
	name: 'cart',
	// начальное состояние
	initialState,
	reducers: {
		// добавление пиццы в корзину
		// в action в payload хранится передаваемый объект пиццы
		addPizza: (state, action: PayloadAction<CardPositionProps>) => {
			// ищем такую же пиццу с таким же типом теста и размером в корзине
			const findPizza = state.pizzas.find(pizza =>
				pizza.id === action.payload.id && pizza.size_id === action.payload.size_id && pizza.type_id === action.payload.type_id
			);
			// увеличиваем кол-во пицц в данной позиции
			if (findPizza) {
				findPizza.count = action.payload.count;
				findPizza.price = action.payload.price;
			} else {
				// если такой пиццы нет в корзине, добавляем
				state.pizzas.push(action.payload);
			}
			// увеличиваем общее кол-во и стоимость пицц в корзине
			state.totalCount += 1;
			state.totalPrice += Number((action.payload.price / action.payload.count).toFixed(2));
		},
		// уменьшение кол-во пицц
		decrementPizza: (state, action: PayloadAction<CardPositionProps>) => {
			const findPizza = state.pizzas.find(pizza => pizza.id === action.payload.id);
			if (findPizza) {
				if (findPizza.count === 1) {
					state.pizzas = state.pizzas.filter(pizza => pizza.id !== action.payload.id);
				} else {
					state.pizzas = state.pizzas.map(pizza => {
						if (pizza.id === action.payload.id) {
							pizza.count = action.payload.count;
							pizza.price = action.payload.price;
							return pizza;
						}
						return pizza;
					});
				}
				state.totalCount -= 1;
				state.totalPrice -= Number((findPizza.price / findPizza.count).toFixed(2));
			}
		},
		// удаление товара из корзины
		deletePizza: (state, action: PayloadAction<CardPositionProps>) => {
			state.pizzas = state.pizzas.filter(pizza => pizza.id !== action.payload.id);
			state.totalCount -= action.payload.count;
			state.totalPrice -= action.payload.price;
		},
		// очистка корзины (возврат изначального пустого состояния)
		clearCart: () => initialState
	},
	extraReducers: (builder) => {
		// ожидание отправки данных
		builder.addCase(fetchCart.pending, (state) => {
			// обнуляем предыдущее состояние
			state.pizzas = [];
			state.totalPrice = 0;
			state.totalCount = 0;
			state.errorMessage = '';
			// устанавливаем флаг загрузки
			state.isLoading = true;
		});
		// успешная загрузка данных о пиццах в корзине
		builder.addCase(fetchCart.fulfilled, (state, action: PayloadAction<CardPositionProps[]>) => {
			state.pizzas = action.payload;
			state.totalCount = action.payload.reduce((count, pizza) => {
				return count + pizza.count;
			}, 0);
			state.totalPrice = action.payload.reduce((price, pizza) => {
				return price + pizza.price;
			}, 0);
			state.isLoading = false;
		});
		// ошибка при запросе данных
		builder.addCase(fetchCart.rejected, (state, action) => {
			// сохраняем в состоянии текст сообщения об ошибке, который ранее вручную извлекли из ответа
			state.errorMessage = action.error.message;
			// снимаем флаг загрузки (данные со старыми пиццами уже были очищены в pending)
			state.isLoading = false;
		});
	}
});

// создаем селектор, который будет возвращать часто используемую функцию по возврату состояния из redux,
// чтобы далее ее переиспользовать вместо того, чтобы всегда писать useSelector((state: RootState) => state.cart) при получении состояния
export const selectCart = (state: RootState) => state.cart;

// экспортируем (сразу диструктуризируя) функции (методы) по изменению состояния
export const {
	addPizza,
	decrementPizza,
	deletePizza,
	clearCart
} = cartSlice.actions;
// экспортируем по умолчанию редюсер (в store при импорте именуется как filterReducer)
export default cartSlice.reducer;