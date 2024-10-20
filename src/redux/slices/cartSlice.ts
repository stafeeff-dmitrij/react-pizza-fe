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
		// сохранение корзины (при загрузке данных с бэка)
		setCart: (state, action: PayloadAction<HorizontalCardProps[]>) => {
			action.payload.map(record => {
				state.pizzas.push(record);
				state.totalCount += record.count;
				state.totalPrice += record.price;
			});
		},
		// добавление пиццы в корзину
		// в action в payload хранится передаваемый объект пиццы
		addPizza: (state, action: PayloadAction<HorizontalCardProps>) => {
			// ищем такую же пиццу с таким же типом теста и размером в корзине
			const foundPizza = state.pizzas.find(pizza =>
				pizza.id === action.payload.id && pizza.size_id === action.payload.size_id && pizza.type_id === action.payload.type_id
			);

			// увеличиваем кол-во пицц в данной позиции
			if (foundPizza) {
				foundPizza.count += 1;
				state.pizzas = state.pizzas.filter(pizza => pizza.id !== action.payload.id);
				state.pizzas.push(foundPizza)
			} else {
				// если такой пиццы нет в корзине, добавляем
				state.pizzas.push(action.payload);
			}
			// увеличиваем общее кол-во и стоимость пицц в корзине
			state.totalCount += 1;
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
	setCart,
	addPizza,
	clearCart
} = cartSlice.actions;
// экспортируем по умолчанию редюсер (в store при импорте именуется как filterReducer)
export default cartSlice.reducer;