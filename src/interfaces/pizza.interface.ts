import { SortTypeKey } from '../redux/slices/filterSlice.ts';

// типизации отправляемых данных на бэк для фильтрации пицц
export interface FilterData {
	sort_type: SortTypeKey;
	size: number;
	page: number;
	category_id?: number;
	search?: string;
}