import { Outlet } from 'react-router-dom';

import Header from './layout/Header/Header.tsx';

import './styles/styles.scss';


function App() {

	return (
		<div className="wrapper">
			<Header/>
			{/* вместо Outlet будут подставляться компоненты, вызываемые роутом по соответствующим URL */}
			<Outlet/>
		</div>
	);
}

export default App;
