import cn from 'classnames';

import Title from '../../components/Title/Title.tsx';


/**
 * @component
 * @description Страница с корзиной
 */
function Cart() {
	return (
		<div className={cn('container')}>
			<Title>Корзина</Title>
		</div>
	);
}

export default Cart;