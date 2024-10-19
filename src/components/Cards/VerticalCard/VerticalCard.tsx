import { useState } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';

import ButtonAdd from '../../Buttons/ButtonAdd/ButtonAdd.tsx';
import { PizzaSizes, PizzaTypes } from '../../../helpers/contains.ts';

import { VerticalCardProps } from './VerticalCard.props.ts';
import { sizesConst } from '../../../helpers/mock-data/sizes.ts';
import { doughTypesConst } from '../../../helpers/mock-data/dough_types.ts';
import { AppDispatch } from '../../../redux/store.ts';
import { addPizza } from '../../../redux/slices/cartSlice.ts';
import { size, type } from '../HorizontalCard/HorizontalCard.props.tsx';

import styles from './VarticalCard.module.scss';


/**
 * @component
 * @description Вертикальная карточка товара
 * @prop {object} pizza - данные о пицце
 */
function VerticalCard(pizza: VerticalCardProps) {

	// функция для вызова методов для изменения состояния
	const dispatch = useDispatch<AppDispatch>()

	const [typePizza, setTypePizza] = useState<type>(PizzaTypes.slim);
	const [sizePizza, setSizePizza] = useState<size>(PizzaSizes.small);
	const [count, setCount] = useState<number>(0);

	const onClickAdd = () => {

		// TODO Запрос на бэк!!!

		if (count >= 10) {
			alert('Нельзя добавить в корзину более 10 одинаковых пицц!');
			return;
		}

		const newPizza = {
			...pizza,
			size: sizePizza,
			type: typePizza,
			count: 1,
		}
		dispatch(addPizza(newPizza))

		setCount(count + 1);
	};

	return (
		<div className={styles['wrapper']}>
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
		</div>
	);
}

export default VerticalCard;