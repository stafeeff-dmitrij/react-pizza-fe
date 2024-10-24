import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

import Header from './layout/Header/Header.tsx';
import { useGetDoughTypesQuery, useGetSizesQuery } from './redux/api/paramsApi.ts';
import { AppDispatch } from './redux/store.ts';
import { fetchCart } from './redux/slices/cartSlice.ts';

import './styles/styles.scss';


function App() {

	// функция для вызова методов для изменения состояния
	const dispatch = useDispatch<AppDispatch>();

	// запрос данных о типах теста
	useGetDoughTypesQuery();
	// запрос данных о размерах пицц
	useGetSizesQuery();

	// получение товаров в корзине
	useEffect(() => {
		dispatch(fetchCart());
	}, []);

	return (
		<div className="wrapper">
			<Header/>
			{/* вместо Outlet будут подставляться компоненты, вызываемые роутом по соответствующим URL */}
			<Outlet/>
		</div>
	);
}

export default App;
