import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ParsedUrlData } from '../../pages/Main/Main.props.ts';


export type SortTypeKey = 'popular' | 'price' | 'name';
export type SortTypeValue = 'популярности' | 'цене' | 'наименованию';

export interface SortTypeState {
	key: SortTypeKey;
	value: SortTypeValue;
}

// типизация начального состояния
export interface FilterState {
	categoryId: number;
	currentPage: number;
	sortType: SortTypeState;
	searchValue: string;
}

// начальное состояние
const initialState: FilterState = {
	categoryId: 0,
	currentPage: 1,
	sortType: { key: 'popular', value: 'популярности' },
	searchValue: '',
};

export const filterSlice = createSlice({
	// уникальное название слайса (отображается в devtools)
	name: 'filters',
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
		setCurrentPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload;
		},
		// установка всех параметров фильтрации (из URL строки)
		setFilterParams: (state, action: PayloadAction<ParsedUrlData>) => {
			if (action.payload.category_id) {
				state.categoryId = action.payload.category_id;
			}
			if (action.payload.sortKey && action.payload.sortValue) {
				state.sortType.key = action.payload.sortKey;
				state.sortType.value = action.payload.sortValue;
			}
			if (action.payload.search) {
				state.searchValue = action.payload.search;
			}
			if (action.payload.page) {
				state.currentPage = action.payload.page;
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
});

// экспортируем (сразу диструктуризируя) функции (методы) по изменению состояния
export const {
	setCategoryId,
	setSortType,
	setSearchValue,
	setCurrentPage,
	setFilterParams,
	clearFilterParams
} = filterSlice.actions;
// экспортируем по умолчанию редюсер (в store при импорте именуется как filterReducer)
export default filterSlice.reducer;