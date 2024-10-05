import { useState } from 'react';
import cn from 'classnames';

import ButtonAdd from '../../Buttons/ButtonAdd/ButtonAdd.tsx';

import { VerticalCardProps } from './VerticalCard.props.ts';

import styles from './VarticalCard.module.scss';



/**
 * @component
 * @description Вертикальная карточка товара
 * @prop {string} title - название товара
 * @prop {number} price - цена товара
 */
function VerticalCard({ title, price }: VerticalCardProps) {

	const [count, setCount] = useState<number>(0);

	const onClickAdd = () => {
		if (count >= 10) {
			alert('Нельзя добавить в корзину более 10 одинаковых пицц!')
			return
		}
		setCount(count + 1);
	}

	return (
		<div className={styles['card']}>
			<img
				className={styles['image']}
				src="https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg"
				alt="Pizza"
			/>
			<h4 className={styles['title']}>{title}</h4>
			<div className={styles['selector']}>
				<ul className={styles['selector-list']}>
					<li className={cn(styles['selector-item'], styles['active'])}>тонкое</li>
					<li className={styles['selector-item']}>традиционное</li>
				</ul>
				<ul className={styles['selector-list']}>
					<li className={cn(styles['selector-item'], styles['active'])}>26 см.</li>
					<li className={styles['selector-item']}>30 см.</li>
					<li className={styles['selector-item']}>40 см.</li>
				</ul>
			</div>
			<div className={styles['bottom']}>
				<div className={styles['price']}>от {price} ₽</div>
				<ButtonAdd count={count} addProduct={onClickAdd} />
			</div>
		</div>
	);
}

export default VerticalCard;