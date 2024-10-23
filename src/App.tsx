import { Outlet } from 'react-router-dom';

import Header from './layout/Header/Header.tsx';
import { useGetDoughTypesQuery, useGetSizesQuery } from './redux/api/paramsApi.ts';

import './styles/styles.scss';


function App() {

	// запрос данных о типах теста
	useGetDoughTypesQuery([]);
	// запрос данных о размерах пицц
	useGetSizesQuery([]);

	// TODO Запрос данных о корзине

	return (
		<div className="wrapper">
			<Header/>
			{/* вместо Outlet будут подставляться компоненты, вызываемые роутом по соответствующим URL */}
			<Outlet/>
		</div>
	);
}

export default App;
