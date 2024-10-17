import { SortTypeKey } from '../redux/slices/filterSlice.ts';

// типизации получаемых данных с бэка о пиццах
export interface Pizza {
	id: number;
	name: string;
	image: string;
	price: number;
	category_id: number;
}

// типизации отправляемых данных на бэк для фильтрации пицц
export interface FilterData {
	category_id?: number;
	sort_type: SortTypeKey;
	search?: string;
}