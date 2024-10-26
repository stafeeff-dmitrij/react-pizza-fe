import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import Main from './pages/Main/Main.tsx';


// через динамический импорт сохраняем в одноименные переменные компоненты, которые хотим разделить в бандле
// эти компоненты будут подгружаться только при необходимости (открытии соответствующей страницы), а не сразу
const PizzaDetail = lazy(() => import('./pages/PizzaDetail/PizzaDetail.tsx'));
const Cart = lazy(() => import('./pages/Cart/Cart/Cart.tsx'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound.tsx'));

// описание всех роутов (страниц)
const router = createBrowserRouter([
	{
		path: '/',
		// ВАЖНО: в маленьких приложениях лучше оборачивать весь роут в Suspense, таким образом мы сделаем сразу
		// все страницы ленивыми с единым компонентом, выводимым в процессе загрузки
		// в больших проектах со сложной маршрутизацией и долгой загрузкой отдельных страниц есть смысл оборачивать отдельные страницы в Suspense
		element: <App/>,
		children: [
			{
				path: '/',
				// нет смысла лениво загружать, т.к. этот компонент отрисовывается всегда сразу же вместе со всем приложением
				element: <Main/>,
			},
			{
				path: '/pizza/:id',
				// обязательно используем Suspense-обработчик, который будет вызывать временный компонент,
				// пока идет ленивая загрузка PizzaDetail-компонента
				element: <Suspense fallback={<p>Загрузка детальной информации о пицце...</p>}>
					<PizzaDetail/>
				</Suspense>,
			},
			{
				path: '/cart',
				element: <Suspense fallback={<p>Загрузка корзины...</p>}>
					<Cart/>
				</Suspense>,
			},
			{
				path: '*',
				element: <Suspense fallback={<p>Загрузка 404 страницы...</p>}>
					<NotFound/>
				</Suspense>,
			}
		],
	},
]);

export default router;