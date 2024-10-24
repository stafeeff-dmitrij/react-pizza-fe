import qs from 'qs';

import { FilterUrlData } from '../pages/Main/Main.props.ts';
import { SortTypeKey } from '../redux/slices/pizzasSlice.ts';


/**
 * @function
 * @description Возврат строки с параметрами фильтрации товаров
 * @param {number} categoryId - id категории
 * @param {string} searchValue - название пиццы
 * @param {string} sortType - тип сортировки
 * @param {number} currentPage - номер текущей страницы
 */
export const getQueryString = (categoryId: number, searchValue: string, sortType: SortTypeKey, currentPage: number): string => {

	// объект с обязательными параметрами
	const filterData: FilterUrlData = {};

	if (categoryId != 0) {
		filterData.category_id = String(categoryId);
	}
	if (searchValue) {
		filterData.search = searchValue;
	}
	if (sortType != 'popular') {
		filterData.sort = sortType;
	}
	if (currentPage != 1) {
		filterData.page = String(currentPage);
	}

	// преобразуем объект с данными фильтрации в строку вида sort=popular&page=1
	return qs.stringify(filterData);
};