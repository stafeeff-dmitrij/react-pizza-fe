// ключи и значения для параметров сортировки
export type SortTypeKey = 'popular' | 'price' | 'name';
export type SortTypeValue = 'популярности' | 'цене' | 'наименованию';

// типизация параметров сортировки пицц
export interface SortTypeState {
	key: SortTypeKey;
	value: SortTypeValue;
}