import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';


/**
 * @component
 * @description Пагинация товаров
 */
function Pagination({ onChangePage, pageCount }) {
	return (
		<ReactPaginate
			className={styles['pagination']}
			breakLabel="..."
			nextLabel=">"
			previousLabel="<"
			onPageChange={(event) => onChangePage(event.selected + 1)}
			marginPagesDisplayed={1}
			pageCount={pageCount}
			renderOnZeroPageCount={null}
		/>
	);
}

export default Pagination;