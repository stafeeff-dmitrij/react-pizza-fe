import { createBrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import Main from './pages/Main/Main.tsx';
import Cart from './pages/Cart/Cart.tsx';


// описание всех роутов (страниц)
const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: "/",
				element: <Main />
			},
			{
				path: "/cart",
				element: <Cart />
			},
			{
				path: '*',
				element: <p>Страница не найдена</p>
			}
		],
	},
])

export default router;