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
			const findPizza = state.pizzas.find(pizza =>
				pizza.id === action.payload.id && pizza.size_id === action.payload.size_id && pizza.type_id === action.payload.type_id
			);
			// увеличиваем кол-во пицц в данной позиции
			if (findPizza) {
				findPizza.count = action.payload.count;
				findPizza.price = action.payload.price;
			} else {
				// если такой пиццы нет в корзине, добавляем
				state.pizzas.push(action.payload);
			}
			// увеличиваем общее кол-во и стоимость пицц в корзине
			state.totalCount += 1;
			state.totalPrice += Number((action.payload.price / action.payload.count).toFixed(2));
		},
		// уменьшение кол-во пицц
		decrementPizza: (state, action: PayloadAction<HorizontalCardProps>) => {
			const findPizza = state.pizzas.find(pizza => pizza.id === action.payload.id);
			if (findPizza) {
				if (findPizza.count === 1) {
					state.pizzas = state.pizzas.filter(pizza => pizza.id !== action.payload.id);
				} else {
					state.pizzas = state.pizzas.map(pizza => {
						if (pizza.id === action.payload.id) {
							pizza.count = action.payload.count;
							pizza.price = action.payload.price;
							return pizza;
						}
						return pizza;
					});
				}
				state.totalCount -= 1;
				state.totalPrice -= Number((findPizza.price / findPizza.count).toFixed(2));
			}
		},
		// удаление товара из корзины
		deletePizza: (state, action: PayloadAction<HorizontalCardProps>) => {
			state.pizzas = state.pizzas.filter(pizza => pizza.id !== action.payload.id);
			state.totalCount -= action.payload.count;
			state.totalPrice -= action.payload.price;
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
	decrementPizza,
	deletePizza,
	clearCart
} = cartSlice.actions;
// экспортируем по умолчанию редюсер (в store при импорте именуется как filterReducer)
export default cartSlice.reducer;