import { useState } from 'react';
import cn from 'classnames';

import ButtonAdd from '../../Buttons/ButtonAdd/ButtonAdd.tsx';
import { PizzaSizes, PizzaTypes } from '../../../helpers/contains.ts';

import { VerticalCardProps } from './VerticalCard.props.ts';
import { sizesConst } from '../../../helpers/mock-data/sizes.ts';
import { doughTypesConst } from '../../../helpers/mock-data/dough_types.ts';

import styles from './VarticalCard.module.scss';


/**
 * @component
 * @description Вертикальная карточка товара
 * @prop {object} pizza - данные о пицце
 */
function VerticalCard(pizza: VerticalCardProps) {

	const [typePizza, setTypePizza] = useState<string>(PizzaTypes.slim);
	const [sizePizza, setSizePizza] = useState<string>(PizzaSizes.small);
	const [count, setCount] = useState<number>(0);

	const onClickAdd = () => {
		if (count >= 10) {
			alert('Нельзя добавить в корзину более 10 одинаковых пицц!');
			return;
		}
		setCount(count + 1);
		console.log(`Добавлена пицца: ${typePizza}, ${sizePizza}, ${count}`);
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
					{doughTypesConst.map(
						(type) => <li
							key={type.id}
							className={cn(styles['selector-item'], {
								[styles['active']]: typePizza === type.id
							})}
							onClick={() => setTypePizza(type.id)}
						>
							{type.name}
						</li>
					)}
				</ul>
				<ul className={styles['selector-list']}>
					{sizesConst.map(
						(size) => <li
							key={size.id}
							className={cn(styles['selector-item'], {
								[styles['active']]: sizePizza === size.id
							})}
							onClick={() => setSizePizza(size.id)}
						>{size.value} см.
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