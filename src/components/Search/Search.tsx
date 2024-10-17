import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store.ts';
import { setSearchValue } from '../../redux/slices/filterSlice.ts';

import styles from './Search.module.scss';


/**
 * @component
 * @description Инпут для поиска товаров
 */
function Search() {

	// достаем из хранилища значение текущего инпута
	const searchValue = useSelector((state: RootState) => state.filter.searchValue)
	// функция для вызова методов для изменения состояния
	const dispatch = useDispatch<AppDispatch>()

	return (
		<div className={styles['search']}>
			<svg
				className={styles['search-icon']} width="30px" height="30px" viewBox="0 -0.5 25 25" fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					fillRule="evenodd" clipRule="evenodd"
					d="M5.5 10.7655C5.50003 8.01511 7.44296 5.64777 10.1405 5.1113C12.8381 4.57483 15.539 6.01866 16.5913 8.55977C17.6437 11.1009 16.7544 14.0315 14.4674 15.5593C12.1804 17.0871 9.13257 16.7866 7.188 14.8415C6.10716 13.7604 5.49998 12.2942 5.5 10.7655Z"
					stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
				/>
				<path
					d="M17.029 16.5295L19.5 19.0005" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
			<input
				className={styles['input']}
				placeholder="Поиск..."
				value={searchValue}
				onChange={(e) => dispatch(setSearchValue(e.target.value))}
			/>
			<svg
				className={styles['clear-icon']}
				onClick={() => dispatch(setSearchValue(''))}
				fill="#000000"
				width="25px"
				height="25px"
				viewBox="0 0 32 32"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M7.004 23.087l7.08-7.081-7.07-7.071L8.929 7.02l7.067 7.069L23.084 7l1.912 1.913-7.089 7.093 7.075 7.077-1.912 1.913-7.074-7.073L8.917 25z"
				/>
			</svg>
		</div>

	);
}

export default Search;