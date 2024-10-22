import { SortTypeKey, SortTypeValue } from '../../redux/slices/filterSlice.ts';
import { Pizza } from '../../redux/slices/pizzasSlice.ts';


// типизации получаемых данных с бэка с пагинацией пицц
export interface PizzaWithPaginationData {
	items: Pizza[];
	total: number;
	page: number;
	size: number;
	pages: number;
}

// типизация данных фильтрации перед сохранением в redux
export interface ParsedUrlData {
	category_id?: number,
	sortKey?: SortTypeKey,
	sortValue?: SortTypeValue,
	search?: string,
	page?: number
}

// типизация данных фильтрации после парсинга URL-строки
export interface FilterUrlData {
	category_id?: string,
	sort?: SortTypeKey,
	search?: string,
	page?: string
}