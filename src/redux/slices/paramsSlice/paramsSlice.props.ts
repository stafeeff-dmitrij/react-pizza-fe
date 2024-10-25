import { PizzaSizes, DoughTypes, DoughNameTypes, PizzaValueSizes } from '../../../helpers/contains.ts';

// ключи размеров пицц
// вместо явного перечисления ключей используем Enum-константы!
// export type size = 'small' | 'average' | 'big';
export type size = PizzaSizes;  // аналогичный результат с константами

// ключи типа теста пицц
// export type type = 'slim' | 'traditional';
export type type = DoughTypes;  // аналогичный результат с константами

// данные о типе теста
export interface DoughType {
	id: type;
	// name: 'Тонкое' | 'Традиционное';
	name: DoughNameTypes;  // аналогичный результат с константами
	price_rise: number;
}

// данные о размерах пицц
export interface Size {
	id: size;
	// value: 26 | 30 | 40;
	value: PizzaValueSizes;  // аналогичный результат с константами
	price_rise: number;
}

// состояние с данными о параметрах пиццы
export interface Params {
	doughTypes: DoughType[];
	sizes: Size[];
}