import { useState } from 'react';
import cn from 'classnames';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store.ts';
import { setSortType, SortTypeState } from '../../redux/slices/filterSlice.ts';
import { sortTypes } from '../../utils/sort.ts';

import styles from './Sorting.module.scss';


/**
 * @component
 * @description Блок с выбором параметра сортировки товаров
 */
function Sorting() {

	// достаем из хранилища текущее значение сортировки
	const sortType = useSelector((state: RootState) => state.filter.sortType);
	// функция для вызова методов для изменения состояния
	const dispatch = useDispatch<AppDispatch>();

	// видимость выпадающего списка
	const [isVisible, setIsVisible] = useState<boolean>(false);

	// сохранение параметра сортировки и закрытие выпадающего списка
	const onClickSorting = (data: SortTypeState) => {
		dispatch(setSortType(data));
		setIsVisible(false);
	};

	return (
		<div className={styles['sort-block']}>
			<div className={styles['label']}>
				<svg
					className={cn({
						[styles['rotate']]: !isVisible
					})}
					width="10"
					height="6"
					viewBox="0 0 10 6"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
						fill="#2C2C2C"
					/>
				</svg>
				<b className={styles['text']}>Сортировка по:</b>
				<span className={styles['input-type']} onClick={() => setIsVisible(!isVisible)}>{sortType.value}</span>
			</div>
			{
				isVisible &&
				<div className={styles['type']}>
					<ul className={styles['type-list']}>
						{sortTypes.map(({ key, value }) =>
							<li
								key={key}
								className={cn(styles['type-item'], {
									[styles['active']]: key === sortType.key
								})}
								onClick={() => onClickSorting({ key, value })}
							>
								{value}
							</li>
						)}
					</ul>
				</div>
			}
		</div>
	);
}

export default Sorting;