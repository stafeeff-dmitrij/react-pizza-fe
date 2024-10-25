import { SortTypeState } from '../../../components/Sorting/Sorting.props.ts';
import { Pizza } from '../../../components/Cards/VerticalCard/VerticalCard.props.ts';

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