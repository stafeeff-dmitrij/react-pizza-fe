import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


export type SortTypeKey = 'popular' | 'price' | 'name';
export type SortTypeValue = 'популярности' | 'цене' | 'наименованию';

export interface SortTypeState {
	key: SortTypeKey;
	value: SortTypeValue;
}

// типизация начального состояния
export interface FilterState {
	categoryId: number;
	sortType: SortTypeState;
}

// начальное состояние
const initialState: FilterState = {
	categoryId: 0,
	sortType: { key: 'price', value: 'цене' }
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
	},
});

// экспортируем (сразу диструктуризируя) функции (методы) по изменению состояния
export const { setCategoryId, setSortType } = filterSlice.actions;
// экспортируем по умолчанию редюсер (в store при импорте именуется как filterReducer)
export default filterSlice.reducer;