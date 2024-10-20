import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios, { AxiosError } from 'axios';
import cn from 'classnames';

import { doughTypesConst } from '../../../helpers/mock-data/dough_types.ts';
import { sizesConst } from '../../../helpers/mock-data/sizes.ts';
import { HorizontalCardProps } from './HorizontalCard.props.tsx';
import { addPizza, deletePizza } from '../../../redux/slices/cartSlice.ts';
import getEnvVariables from '../../../helpers/envVariables.ts';
import { AppDispatch } from '../../../redux/store.ts';

import styles from './HorizontalCard.module.scss';


/**
 * @component
 * @description Горизонтальная карточка товара
 * @prop {object} pizza - данные о пицце
 */
function HorizontalCard(pizza: HorizontalCardProps) {

	// переменные окружения
	const envVariables = getEnvVariables();

	// функция для вызова методов для изменения состояния
	const dispatch = useDispatch<AppDispatch>()

	const [typePizza, setTypePizza] = useState<string>('-');
	const [sizePizza, setSizePizza] = useState<number>(30);
	const [count, setCount] = useState<number>(pizza.count);

	// удаление товара из корзины
	const onClickDeletePizza = async () => {
		try {
			await axios.delete(`${envVariables.BASE_URL}/cart/${pizza.id}`);
			dispatch(deletePizza(pizza.id));
		} catch (error) {
			if (error instanceof AxiosError) {
				alert(error.response?.data.detail);
			}
		}
	}

	// уменьшение товара на один
	const onClickDecrement = () => {
		console.log('Уменьшение товара на 1')
	}

	// увеличение товара на один (добавление товара в корзину)
	const onClickIncrement = async () => {
		try {
			const { data } = await axios.post<HorizontalCardProps>(`${envVariables.BASE_URL}/cart`, {
				pizza_id: pizza.pizza_id,
				type_id: pizza.type_id,
				size_id: pizza.size_id,
			});
			dispatch(addPizza(data));
			setCount(data.count);
		} catch (error) {
			if (error instanceof AxiosError) {
				alert(error.response?.data.detail);
			}
		}
	}

	useEffect(() => {
		doughTypesConst.map(type => {
			if (type.id === pizza.type_id) {
				setTypePizza(type.name.toLowerCase());
			}},
		sizesConst.map(size => {
			if (size.id === pizza.size_id) {
				setSizePizza(size.value);
			}}
		)
		)
	}, [])

	return (
		<div className={styles['product']}>
			<img
				className={styles['image']}
				src={pizza.image}
				alt={pizza.name}
			/>
			<div className={styles['info']}>
				<h3 className={styles['title']}>{pizza.name}</h3>
				<p className={styles['description']}>{`${typePizza} тесто, ${sizePizza} см.`}
				</p>
			</div>
			<div className={styles['count']}>
				<div className={cn('button', styles['button-circle'], styles['count-minus'])} onClick={onClickDecrement}>
					<svg
						width="10" height="10" viewBox="0 0 10 10" fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
							fill="#EB5A1E"
						/>
						<path
							d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
							fill="#EB5A1E"
						/>
					</svg>
				</div>
				<b className={styles['product-count']}>{count}</b>
				<div className={cn('button', styles['button-circle'])} onClick={onClickIncrement}>
					<svg
						width="10" height="10" viewBox="0 0 10 10" fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
							fill="#EB5A1E"
						/>
						<path
							d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
							fill="#EB5A1E"
						/>
					</svg>
				</div>
			</div>
			<div className={styles['product-price']}>
				<b className={styles['price']}>{pizza.price} ₽</b>
			</div>
			<div className={styles['button-remove']} onClick={onClickDeletePizza}>
				<div className={cn('button', styles['button-circle'], styles['remove'])}>
					<svg
						width="10" height="10" viewBox="0 0 10 10" fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
							fill="#EB5A1E"
						/>
						<path
							d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
							fill="#EB5A1E"
						/>
					</svg>
				</div>
			</div>
		</div>
	);
}

export default HorizontalCard;