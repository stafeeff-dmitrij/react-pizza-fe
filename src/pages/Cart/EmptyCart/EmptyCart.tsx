import Title from '../../../components/Title/Title.tsx';
import ButtonBackBlack from '../../../components/Buttons/ButtonBackBlack/ButtonBackBlack.tsx';

import styles from './EmptyCart.module.scss';


/**
 * @component
 * @description Страница с пустой корзиной
 */
function EmptyCart() {
	return (
		<div className={styles['empty-cart']}>
			<Title className={styles['title-mb']}>Корзина пустая</Title>
			<p className={styles['description']}>
				Вероятней всего, вы не заказывали ещё пиццу.<br/>
				Для того, чтобы заказать пиццу, перейди на главную страницу.
			</p>
			<img className={styles['image']} src="/images/empty-cart.svg" alt="Пустая корзина"/>
			<ButtonBackBlack/>
		</div>
	);
}

export default EmptyCart;