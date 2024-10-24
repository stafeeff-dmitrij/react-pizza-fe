import { FilterUrlData } from '../pages/Main/Main.props.ts';
import { sortTypes } from './sort.ts';
import { SortTypeKey, SortTypeValue } from '../redux/slices/pizzasSlice.ts';
import { FilterData } from '../interfaces/pizza.interface.ts';


/**
 * @function
 * @description Возврат объекта с параметрами фильтрации для выполнения запроса на бэк
 * @param {number} categoryId - номер категории
 * @param {string} searchValue - строка для поиска товаров
 * @param {SortTypeKey} sortType - ключ типа сортировки
 * @param {number} currentPage - номер текущей страницы
 */
export const getParamsForRequest = (categoryId: number, searchValue: string, sortType: SortTypeKey, currentPage: number) => {
	// динамически формируем объект с параметрами в зависимости от переданных необязательных параметров
	const params: FilterData = {
		sort_type: sortType,
		size: 8,
		page: currentPage,
	};
	if (categoryId) {
		params.category_id = categoryId;
	}
	if (searchValue) {
		params.search = searchValue;
	}
	return params;
};


// типизация данных фильтрации перед сохранением в redux
export interface ParsedUrlData {
	category_id?: number,
	sortKey?: SortTypeKey,
	sortValue?: SortTypeValue,
	search?: string,
	page?: number
}

/**
 * @function
 * @description Возврат объекта с параметрами фильтрации для сохранения в redux
 * @param {Object} params - параметры фильтрации
 */
export const getParamsForStore = (params: FilterUrlData): ParsedUrlData => {
	const filterData: ParsedUrlData = {};

	if (params.category_id) {
		filterData.category_id = Number(params.category_id);
	}

	if (params.sort) {
		const sortType = sortTypes.find((obj) =>
			obj.key === params.sort
		);
		if (sortType) {
			filterData.sortKey = sortType.key;
			filterData.sortValue = sortType.value;
		}
	}

	if (params.search) {
		filterData.search = params.search;
	}

	if (params.page) {
		filterData.page = Number(params.page);
	} else {
		// сохраняем 1 страницу, если страница не указана в URL
		filterData.page = 1;
	}

	return filterData;
};