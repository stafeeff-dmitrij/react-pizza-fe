import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';

import { AppDispatch } from '../../redux/store.ts';
import { selectFilter, setCurrentPage } from '../../redux/slices/filterSlice.ts';

import styles from './Pagination.module.scss';


/**
 * @component
 * @description Пагинация товаров
 */
function Pagination({ pageCount }: {pageCount: number}) {

	// достаем из хранилища номер текущей страницы
	// вместо useSelector((state: RootState) => state.filter) вызываем селектор, в котором хранится стрелочная функция
	const { currentPage } = useSelector(selectFilter);
	// функция для вызова методов для изменения состояния
	const dispatch = useDispatch<AppDispatch>();

	return (
		// т.к. в библиотеке в качестве номеров страниц используются индексы, где 1 страница имеет 0 индекс и т.д.
		// при изменении страницы в redux прибавляем к индексу 1, для передачи текущей страницы из redux в компонент наоборот вычитаем 1
		<ReactPaginate
			className={styles['pagination']}
			breakLabel="..."
			nextLabel=">"
			previousLabel="<"
			onPageChange={(event) => dispatch(setCurrentPage(event.selected + 1))}
			marginPagesDisplayed={1}
			pageCount={pageCount}
			forcePage={currentPage - 1}
			renderOnZeroPageCount={null}
		/>
	);
}

export default Pagination;