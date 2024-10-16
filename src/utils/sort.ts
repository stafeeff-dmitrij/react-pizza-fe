import { SortingTypes } from '../helpers/contains.ts';

const sortKeys = Object.keys(SortingTypes) as Array<keyof typeof SortingTypes>;
const sortValues = Object.values(SortingTypes);

// массив объектов с ключами и значениями для сортировки
export const sortTypes = sortKeys.map((key, index) => ({
	key,
	value: sortValues[index]
}));