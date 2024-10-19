// размеры пицц
export type size = 'small' | 'average' | 'big';
// тип теста пицц
export type type = 'slim' | 'traditional';

// типизация данных об одной пицце в корзине
export interface HorizontalCardProps {
	id: number;
	name: string;
	image: string;
	price: number;
	size: size;
	type: type;
	count: number;
}