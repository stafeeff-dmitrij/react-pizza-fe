// размеры пицц
export type size = 'small' | 'average' | 'big';
// тип теста пицц
export type type = 'slim' | 'traditional';

// типизация данных об позиции с пиццей в корзине
export interface HorizontalCardProps {
	id: number;
	pizza_id: number;
	name: string;
	image: string;
	price: number;
	size_id: size;
	type_id: type;
	count: number;
}