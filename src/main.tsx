import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import router from './router.tsx';


createRoot(document.getElementById('root')!).render(
	<StrictMode>
		{/*
			Подключаем роутинг.
			Корневой компонент App внутри router для главной страницы, т.к. шапка есть на всех страницах.
			Дочерние компоненты сменяют друг друга в зависимости от URL
		*/}
		<RouterProvider router={router}/>
	</StrictMode>,
);
