import { SortTypeKey } from '../redux/slices/filterSlice.ts';

// типизации получаемых данных о пиццах с бэка
export interface Pizza {
	pizza_id: number;
	name: string;
	image: string;
	price: number;
	category_id: number;
}

// типизации получаемых данных с бэка с пагинацией пицц
export interface PizzaWithPaginationData {
	items: Pizza[];
	total: number;
	page: number;
	size: number;
	pages: number;
}

// типизации отправляемых данных на бэк для фильтрации пицц
export interface FilterData {
	sort_type: SortTypeKey;
	size: number;
	page: number;
	category_id?: number;
	search?: string;
}