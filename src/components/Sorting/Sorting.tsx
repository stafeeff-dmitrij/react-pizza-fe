import { useEffect, useRef, useState } from 'react';
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

	// для выделения div-элемента блока сортировки
	// логика следующая: если клик внутри данного элемента - ничего не делаем
	// если клик вне данного элемента - закрываем выпадающий список
	const sortRef = useRef<HTMLDivElement>(null);

	// видимость выпадающего списка
	const [isVisible, setIsVisible] = useState<boolean>(false);

	// сохранение параметра сортировки и закрытие выпадающего списка
	const onClickSorting = (data: SortTypeState) => {
		dispatch(setSortType(data));
		setIsVisible(false);
	};

	// обработчик клика на родительский элемент
	// обычно не рекомендуется обращаться к DOM-элементам вне реакта (не через useRef), однако
	// в данном случае мы обращаемся к главному родительскому элементу body, которого нет в данном компоненте Sorting
	// обращение к главному DOM-элементу в данном случае приемлемо
	useEffect(() => {

		// специально вынесли для передачи при навешивании и удалении обработчика клика для body
		const handleClickOutside = (event: MouseEvent) => {
			// сохраняем path - массив дочерних DOM-элементов, находящихся внутри элемента, по которому был клик
			const path = event.composedPath();
			// HTML-элемент с сортировкой (включает в себя label и выпадающий div со значениями сортировки)
			const sortDivElement = sortRef.current;

			// если блока с сортировкой нет среди дочерних элементов, значит клик был вне блока сортировки
			if (sortDivElement != null && !path.includes(sortDivElement)) {
				// закрываем выпадающий блок
				setIsVisible(false);
			}
		};

		// навешиваем обработчик события клика по родительскому DOM-элементу body
		// каждый раз при данном событии будет вызываться функция handleClickOutside
		document.body.addEventListener('click', handleClickOutside);

		// при удалении компонента Sorting (при переходе на другую страницу) выполнится return, в котором
		// вернется функция по удалению обработчика клика
		// таким образом мы избавимся от бага, что при переходе на другую страницу и возврате обратно на body каждый раз
		// навесился новый обработчик события, увеличивая их кол-во (старый не удаляется автоматически)
		return () => document.body.removeEventListener('click', handleClickOutside);
	}, []);

	return (
		<div className={styles['sort-block']} ref={sortRef}>
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