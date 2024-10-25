import { Pizza } from '../../components/Cards/VerticalCard/VerticalCard.props.ts';
import { SortTypeKey } from '../../components/Sorting/Sorting.props.ts';


// типизации получаемых данных с бэка с пагинацией пицц
export interface PizzasWithPaginationData {
	items: Pizza[];
	total: number;
	page: number;
	size: number;
	pages: number;
}

// типизация данных фильтрации после парсинга URL-строки
export interface FilterUrlData {
	category_id?: string,
	sort?: SortTypeKey,
	search?: string,
	page?: string
}