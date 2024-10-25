import { ProductInCard } from '../../../components/Cards/HorizontalCard/HorizontalCard.props.ts';

// начальное состояние с данными о пиццах в корзине
export interface cartState {
	pizzas: ProductInCard[];
	totalCount: number;
	totalPrice: number;
	isLoading: boolean;
	errorMessage?: string;
}