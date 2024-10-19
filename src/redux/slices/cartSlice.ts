import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HorizontalCardProps } from '../../components/Cards/HorizontalCard/HorizontalCard.props.tsx';


// типизация начального состояния с данными о пиццах в корзине
export interface cartState {
	pizzas: HorizontalCardProps[];
	totalCount: number;
	totalPrice: number;
}

// начальное состояние
const initialState: cartState = {
	pizzas: [],
	totalCount: 0,
	totalPrice: 0,
};

export const cartSlice = createSlice({
	// уникальное название слайса (отображается в devtools)
	name: 'cart',
	// начальное состояние
	initialState,
	reducers: {
		// добавление пиццы в корзину
		// в action в payload хранится передаваемый объект пиццы
		addPizza: (state, action: PayloadAction<HorizontalCardProps>) => {
			// ищем такую же пиццу с таким же типом теста и размером в корзине
			const foundPizza = state.pizzas.find(pizza =>
				pizza.id === action.payload.id && pizza.size === action.payload.size && pizza.type === action.payload.type
			);

			// увеличиваем кол-во пицц в данной позиции
			if (foundPizza) {
				foundPizza.count += action.payload.count;
				state.pizzas = state.pizzas.filter(pizza => pizza.id !== action.payload.id);
				state.pizzas.push(foundPizza)
			} else {
				// если такой пиццы нет в корзине, добавляем
				state.pizzas.push(action.payload);
			}
			// увеличиваем общее кол-во и стоимость пицц в корзине
			state.totalCount += action.payload.count;
			state.totalPrice += action.payload.price;
		},
		// очистка корзины
		clearCart: (state) => {
			state.pizzas = [];
			state.totalCount = 0;
			state.totalPrice = 0;
		}
	},
});

// экспортируем (сразу диструктуризируя) функции (методы) по изменению состояния
export const {
	addPizza,
	clearCart
} = cartSlice.actions;
// экспортируем по умолчанию редюсер (в store при импорте именуется как filterReducer)
export default cartSlice.reducer;