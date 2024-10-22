import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { FilterData } from '../../interfaces/pizza.interface.ts';
import { PizzaWithPaginationData } from '../../pages/Main/Main.props.ts';
import getEnvVariables from '../../helpers/envVariables.ts';


// типизации получаемых данных о пиццах с бэка
export interface Pizza {
	pizza_id: number;
	name: string;
	image: string;
	price: number;
	category_id: number;
}

// типизация начального состояния
export interface PizzasState {
	pizzas: Pizza[],
	isLoading: boolean,
	errorMessage?: string,
}

// начальное состояние
const initialState: PizzasState = {
	pizzas: [],
	isLoading: false,
	errorMessage: ''
};

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

			// в качестве примера можно вызывать любые методы по изменению состояний в других слайсов
			// thunkAPI.dispatch(setPizzas(data.items))
			// можно достать любые данные, н-р, о параметрах фильтрации, из состояния (в том числе из других слайсов)
			// thunkAPI.getState()

			return data;
		} catch (error) {
			// если ошибка является типом AxiosError (ошибка, действительно вызвана пакетом axios при неуспешном запросе)
			if (error instanceof AxiosError) {
				// пробрасываем наверх ошибку, передав в нее возможный текст сообщение из ответа сервера
				// текст ошибки сохранится в action.error.message
				throw new Error(error.response?.data.detail);
			}
		}
	},
);

export const pizzaSlice = createSlice({
	// уникальное название слайса (отображается в devtools)
	name: 'pizza',
	// начальное состояние
	initialState,
	reducers: {
		// сохранение пицц и данных о пагинации(при первичной загрузке данных с бэка)
		setPizzas: (state, action: PayloadAction<Pizza[]>) => {
			state.pizzas = action.payload;
		},
	},
	extraReducers: (builder) => {
		// ожидание отправки данных
		builder.addCase(fetchPizzas.pending, (state) => {
			// устанавливаем флаг загрузки
			state.isLoading = true;
			// очищаем данные с пиццами при выполнении запроса
			state.pizzas = [];
		});
		// успешная загрузка данных о пиццах
		builder.addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<PizzaWithPaginationData>) => {
			// сохраняем все полученные пиццы в состоянии
			state.pizzas = action.payload.items;
			// снимаем флаг загрузки
			state.isLoading = false;
		});
		// ошибка при запросе данных
		builder.addCase(fetchPizzas.rejected, (state, action) => {
			// сохраняем в состоянии текст сообщения об ошибке, который ранее вручную извлекли из ответа и пробросили в новый объект ошибки через throw new Error
			state.errorMessage = action.error.message;
			// снимаем флаг загрузки
			state.isLoading = false;
			// очищаем данные с пиццами (в случае ошибки не выводились старые данные)
			state.pizzas = [];
		});
	}
});

// экспортируем (сразу диструктуризируя) функции (методы) по изменению состояния
export const {
	setPizzas,
} = pizzaSlice.actions;
// экспортируем по умолчанию редюсер (в store при импорте именуется как filterReducer)
export default pizzaSlice.reducer;