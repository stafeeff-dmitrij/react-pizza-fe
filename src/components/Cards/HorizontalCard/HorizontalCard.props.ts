import { size, type } from '../../../redux/slices/paramsSlice/paramsSlice.props.ts';

// данные об позиции с пиццей в корзине
export interface ProductInCard {
	id: number;
	pizza_id: number;
	name: string;
	image: string;
	price: number;
	size_id: size;
	type_id: type;
	count: number;
}