// ключи размеров пицц
export type size = 'small' | 'average' | 'big';
// ключи типа теста пицц
export type type = 'slim' | 'traditional';

// данные о типе теста
export interface DoughType {
	id: type;
	name: 'Тонкое' | 'Традиционное';
	price_rise: number;
}

// данные о размерах пицц
export interface Size {
	id: size;
	value: 26 | 30 | 40;
	price_rise: number;
}

// состояние с данными о параметрах пиццы
export interface Params {
	doughTypes: DoughType[];
	sizes: Size[];
}