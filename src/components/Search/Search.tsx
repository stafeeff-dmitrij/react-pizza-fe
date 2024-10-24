import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// для отложенного вызова функций
import debounce from 'lodash.debounce';

import { AppDispatch, RootState } from '../../redux/store.ts';
import { setSearchValue } from '../../redux/slices/pizzasSlice.ts';

import styles from './Search.module.scss';


/**
 * @component
 * @description Инпут для поиска товаров
 */
function Search() {

	// достаем из хранилища нужные данные
	const { searchValue } = useSelector((state: RootState) => state.pizza);
	// функция для вызова методов для изменения состояния
	const dispatch = useDispatch<AppDispatch>();

	// локальное состояние с введенным текстом (будет отображаться сразу в инпуте)
	// searchValue будем изменять через пол секунды вместе с выполнением запроса, чтобы не грузить сильно бэк частыми запросами при вводе каждой буквы
	const [inputValue, setInputValue] = useState(searchValue);

	// плохая практика менять DOM-элементы напрямую через document, делать это нужно через useRef!
	// через хук useRef сохраняем всю реактовскую логику по работе с DOM-элементами в переменную
	// в скобках указывается стартовое значение (null), которое после заменится HTML-элементом
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		setInputValue(searchValue);
	}, [searchValue])

	// очистка инпута и фокус на инпуте для повторного ввода текста
	const onClickClear = () => {
		// сбрасываем значение в локальном состоянии
		setInputValue('');
		// сбрасываем значение инпута в redux состоянии (выполнится запрос на бэк)
		dispatch(setSearchValue(''));
		// применяем фокус на инпут для повторного ввода текста
		inputRef.current?.focus();
	};

	// обновление значения в redux и запрос на бэк только через пол секунды после завершения ввода в инпуте,
	// чтобы не грузить бэк частыми запросами при вводе каждого символа
	// useCallback возвращает ссылку на функцию, созданную один раз (массив зависимостей пуст),
	// в результате чего при перерисовке компонента функция не создается заново и не делаются лишние запросы на бэк
	const updateSearchValue = useCallback(
		debounce((value: string) => {
				dispatch(setSearchValue(value));
			},
			500),
		[]
	);

	const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
		// изменяем значение в локальном состоянии сразу
		setInputValue(event.target.value);
		// в redux и запрос на бэк только через пол секунды после завершения ввода текста
		updateSearchValue(event.target.value);
	}

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
			{/* в react можно влиять на все HTML-элементы, указав в параметре ref переменную, созданную через useRef для дальнейшего изменения HTML-элемента */}
			<input
				className={styles['input']}
				ref={inputRef}
				placeholder="Поиск..."
				value={inputValue}
				onChange={(event) => onChangeInput(event)}
			/>
			<svg
				className={styles['clear-icon']}
				onClick={onClickClear}
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