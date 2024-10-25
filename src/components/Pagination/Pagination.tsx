import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';

import { AppDispatch, RootState } from '../../redux/store.ts';
import { setCurrentPage } from '../../redux/slices/pizzasSlice/pizzasSlice.ts';

import styles from './Pagination.module.scss';


/**
 * @component
 * @description Пагинация товаров
 */
function Pagination() {

	// достаем из хранилища нужные данные
	const { currentPage, totalPage } = useSelector((state: RootState) => state.pizza);
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
			pageCount={totalPage}
			forcePage={currentPage - 1}
			renderOnZeroPageCount={null}
		/>
	);
}

export default Pagination;