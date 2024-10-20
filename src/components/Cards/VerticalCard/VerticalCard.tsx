import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import axios, { AxiosError } from 'axios';

import ButtonAdd from '../../Buttons/ButtonAdd/ButtonAdd.tsx';
import { PizzaSizes, PizzaTypes } from '../../../helpers/contains.ts';
import { VerticalCardProps } from './VerticalCard.props.ts';
import { sizesConst } from '../../../helpers/mock-data/sizes.ts';
import { doughTypesConst } from '../../../helpers/mock-data/dough_types.ts';
import { AppDispatch, RootState } from '../../../redux/store.ts';
import { addPizza } from '../../../redux/slices/cartSlice.ts';
import { HorizontalCardProps, size, type } from '../HorizontalCard/HorizontalCard.props.tsx';
import getEnvVariables from '../../../helpers/envVariables.ts';

import styles from './VarticalCard.module.scss';


/**
 * @component
 * @description Вертикальная карточка товара
 * @prop {object} pizza - данные о пицце
 */
function VerticalCard(pizza: VerticalCardProps) {

	// переменные окружения
	const envVariables = getEnvVariables();

	// достаем из хранилища данные по товарам в корзине
	const { pizzas } = useSelector((state: RootState) => state.cart);
	// функция для вызова методов для изменения состояния
	const dispatch = useDispatch<AppDispatch>()

	const [typePizza, setTypePizza] = useState<type>(PizzaTypes.slim);
	const [sizePizza, setSizePizza] = useState<size>(PizzaSizes.small);
	const [count, setCount] = useState<number>(0);

	// добавление товара в корзину
	const onClickAdd = async () => {
		try {
			const { data } = await axios.post<HorizontalCardProps>(`${envVariables.BASE_URL}/cart`, {
				pizza_id: pizza.pizza_id,
				type_id: typePizza,
				size_id: sizePizza,
			});
			dispatch(addPizza(data));
			setCount(data.count);
		} catch (error) {
			if (error instanceof AxiosError) {
				alert(error.response?.data.detail);
			}
		}
	};

	// проверка и обновление кол-ва пицц в корзине, если товар с выбранными опциями уже есть в корзине
	useEffect(() => {
		// от лишних перерисовок и сброса счетчика
		let flag = false;

		pizzas.map(p => {
			if (p.pizza_id == pizza.pizza_id && p.size_id === sizePizza && p.type_id === typePizza) {
				setCount(p.count);
				flag = true;
				return;
			}
		})
		if (!flag) {
			setCount(0);
		}
	}, [pizza, pizzas, typePizza, sizePizza]);

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