import { useState } from 'react';
import cn from 'classnames';

import ButtonAdd from '../../Buttons/ButtonAdd/ButtonAdd.tsx';
import { PizzaSizes, PizzaTypes } from '../../../helpers/contains.ts';

import { VerticalCardProps } from './VerticalCard.props.ts';

import styles from './VarticalCard.module.scss';


/**
 * @component
 * @description Вертикальная карточка товара
 * @prop {object} pizza - данные о пицце
 */
function VerticalCard(pizza: VerticalCardProps) {

	const [typePizza, setTypePizza] = useState<number>(0);
	const [sizePizza, setSizePizza] = useState<number>(PizzaSizes.small);
	const [count, setCount] = useState<number>(0);

	const types = Object.values(PizzaTypes);

	const onClickAdd = () => {
		if (count >= 10) {
			alert('Нельзя добавить в корзину более 10 одинаковых пицц!');
			return;
		}
		setCount(count + 1);
	};

	return (
		<div className={styles['card']}>
			<img
				className={styles['image']}
				src={pizza.image}
				alt={pizza.name}
			/>
			<h4 className={styles['title']}>{pizza.name}</h4>
			<div className={styles['selector']}>
				<ul className={styles['selector-list']}>
					{pizza.types.map(
						typeIndex => <li
							className={cn(styles['selector-item'], {
								[styles['active']]: typePizza === typeIndex
							})}
							onClick={() => setTypePizza(typeIndex)}
						>
							{types[typeIndex]}
						</li>
					)}
				</ul>
				<ul className={styles['selector-list']}>
					{pizza.sizes.map(
						size => <li
							className={cn(styles['selector-item'], {
								[styles['active']]: sizePizza === size
							})}
							onClick={() => setSizePizza(size)}
						>{size} см.
						</li>
					)}
				</ul>
			</div>
			<div className={styles['bottom']}>
				<div className={styles['price']}>от {pizza.price} ₽</div>
				<ButtonAdd count={count} addProduct={onClickAdd}/>
			</div>
		</div>
	);
}

export default VerticalCard;