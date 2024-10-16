import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import router from './router.tsx';
import { store } from './redux/store.ts';


createRoot(document.getElementById('root')!).render(
	<StrictMode>
		{/* оборачиваем все приложение, чтобы из любого компонента был доступ к хранилищу */}
		{/* указываем созданное хранилище store */}
		<Provider store={store}>
			{/*
			Подключаем роутинг.
			Корневой компонент App внутри router для главной страницы, т.к. шапка есть на всех страницах.
			Дочерние компоненты сменяют друг друга в зависимости от URL
		*/}
			<RouterProvider router={router}/>
		</Provider>
	</StrictMode>,
);
