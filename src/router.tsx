import { createBrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import Main from './pages/Main/Main.tsx';
import NotFound from './pages/NotFound/NotFound.tsx';
import Cart from './pages/Cart/Cart/Cart.tsx';
import PizzaDetail from './pages/PizzaDetail/PizzaDetail.tsx';


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
				path: "/pizza/:id",
				element: <PizzaDetail />
			},
			{
				path: "/cart",
				element: <Cart />
			},
			{
				path: '*',
				element: <NotFound />
			}
		],
	},
])

export default router;