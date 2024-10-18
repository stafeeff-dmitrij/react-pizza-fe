import { FilterUrlData, ParsedUrlData } from '../pages/Main/Main.props.ts';
import { sortTypes } from './sort.ts';


/**
 * @function
 * @description Возврат объекта с параметрами фильтрации для сохранения в redux
 * @param {Object} params - параметры фильтрации
 */
export const getFilterData = (params: FilterUrlData): ParsedUrlData => {
	const filterData: ParsedUrlData = {};

	if (params.category_id) {
		filterData.category_id = Number(params.category_id)
	}
	if (params.sort) {
		const sortType = sortTypes.find((obj) =>
			obj.key === params.sort
		)
		if (sortType) {
			filterData.sortKey = sortType.key
			filterData.sortValue = sortType.value
		}
	}
	if (params.search) {
		filterData.search = params.search
	}
	if (params.page) {
		filterData.page = Number(params.page)
	}

	return filterData;
}