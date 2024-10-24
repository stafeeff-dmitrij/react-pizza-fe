import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { FilterData } from '../../interfaces/pizza.interface.ts';
import { PizzaWithPaginationData } from '../../pages/Main/Main.props.ts';
import getEnvVariables from '../../helpers/envVariables.ts';
import { ParsedUrlData } from '../../utils/filterParams.ts';
import { RootState } from '../store.ts';


// TODO Вынести типизацию в отдельный файл рядом со слайсом
export type SortTypeKey = 'popular' | 'price' | 'name';
export type SortTypeValue = 'популярности' | 'цене' | 'наименованию';

// типизация параметров сортировки пицц
export interface SortTypeState {
	key: SortTypeKey;
	value: SortTypeValue;
}

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
	categoryId: number;
	currentPage: number;
	totalPage: number;
	sortType: SortTypeState;
	searchValue: string;
	pizzas: Pizza[],
	isLoading: boolean,
	errorMessage?: string,
}

// начальное состояние с параметрами фильтрации
const initialState: PizzasState = {
	categoryId: 0,
	currentPage: 1,
	totalPage: 1,
	sortType: { key: 'popular', value: 'популярности' },
	searchValue: '',
	pizzas: [],
	isLoading: false,
	errorMessage: ''
};

// типизация объекта при получении ошибки
export interface errorResponse {
	response: {
		data: {
			detail: string
		}
	};
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

export const pizzaSlice = createSlice({
	// уникальное название слайса (отображается в devtools)
	name: 'pizza',
	// начальное состояние
	initialState,
	reducers: {
		// в action в payload хранится передаваемое значение (id категории)
		setCategoryId: (state, action: PayloadAction<number>) => {
			state.categoryId = action.payload;
		},
		// в action в payload хранится передаваемое значение для сортировки
		setSortType: (state, action: PayloadAction<SortTypeState>) => {
			state.sortType.key = action.payload.key;
			state.sortType.value = action.payload.value;
		},
		setSearchValue: (state, action: PayloadAction<string>) => {
			state.searchValue = action.payload;
		},
		// смена текущей страницы
		setCurrentPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload;
		},
		// установка имеющихся параметров фильтрации из URL строки, не указанные параметры проставляются на значения по умолчанию
		setFilterParams: (state, action: PayloadAction<ParsedUrlData>) => {
			if (action.payload.category_id) {
				state.categoryId = action.payload.category_id;
			} else {
				state.categoryId = initialState.categoryId;
			}
			if (action.payload.sortKey && action.payload.sortValue) {
				state.sortType.key = action.payload.sortKey;
				state.sortType.value = action.payload.sortValue;
			} else {
				state.sortType = initialState.sortType;
			}
			if (action.payload.search) {
				state.searchValue = action.payload.search;
			} else {
				state.searchValue = initialState.searchValue;
			}
			if (action.payload.page) {
				state.currentPage = action.payload.page;
			} else {
				state.currentPage = initialState.currentPage;
			}
		},
		// очистка всех параметров фильтрации
		clearFilterParams: (state) => {
			state.searchValue = initialState.searchValue;
			state.sortType = initialState.sortType;
			state.categoryId = initialState.categoryId;
			state.currentPage = initialState.currentPage;
		}
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
			state.totalPage = action.payload.pages;
			// снимаем флаг загрузки и удаляем сообщение об ошибке, если было
			state.isLoading = false;
			state.errorMessage = '';
		});
		// ошибка при запросе данных
		builder.addCase(fetchPizzas.rejected, (state, action) => {
			// сохраняем в состоянии текст сообщения об ошибке, который ранее вручную извлекли из ответа
			state.errorMessage = action.error.message;
			// снимаем флаг загрузки (данные со старыми пиццами уже были очищены в pending)
			state.isLoading = false;
		});
	}
});

// экспортируем (сразу диструктуризируя) функции (методы) по изменению состояния
export const {
	setCategoryId,
	setSortType,
	setSearchValue,
	setCurrentPage,
	setFilterParams,
	clearFilterParams
} = pizzaSlice.actions;
// экспортируем по умолчанию редюсер (в store при импорте именуется как filterReducer)
export default pizzaSlice.reducer;