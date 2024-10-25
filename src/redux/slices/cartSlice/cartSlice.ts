import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../store.ts';
import { cartState } from './cartSlice.props.ts';
import { ProductInCard } from '../../../components/Cards/HorizontalCard/HorizontalCard.props.ts';
import { fetchCart } from '../../thunks/cart/fetchCart.ts';
import { addPizza } from '../../thunks/cart/addPizza.ts';
import { clearCart } from '../../thunks/cart/clearCart.ts';
import { deletePizza } from '../../thunks/cart/deletePizza.ts';
import { decrementCountPizza } from '../../thunks/cart/decrementCountPizza.ts';


// начальное состояние
const initialState: cartState = {
	pizzas: [],
	totalCount: 0,
	totalPrice: 0,
	isLoading: false,
};

export const cartSlice = createSlice({
	// уникальное название слайса (отображается в devtools)
	name: 'cart',
	// начальное состояние
	initialState,
	reducers: {
		// уменьшение кол-во пицц
		decrementPizza: (state, action: PayloadAction<ProductInCard>) => {
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
		removePizza: (state, action: PayloadAction<ProductInCard>) => {
			state.pizzas = state.pizzas.filter(pizza => pizza.id !== action.payload.id);
			state.totalCount -= action.payload.count;
			state.totalPrice -= action.payload.price;
		},
	},
	extraReducers: (builder) => {
		// ПОЛУЧЕНИЕ ТОВАРОВ В КОРЗИНЕ
		// ожидание отправки данных
		builder.addCase(fetchCart.pending, (state) => {
			// обнуляем предыдущее состояние
			state.pizzas = [];
			state.totalPrice = 0;
			state.totalCount = 0;
			state.errorMessage = '';
			// устанавливаем флаг загрузки
			state.isLoading = true;
		});
		// успешная загрузка данных о пиццах в корзине
		builder.addCase(fetchCart.fulfilled, (state, action: PayloadAction<ProductInCard[]>) => {
			state.pizzas = action.payload;
			state.totalCount = action.payload.reduce((count, pizza) => {
				return count + pizza.count;
			}, 0);
			state.totalPrice = action.payload.reduce((price, pizza) => {
				return price + pizza.price;
			}, 0);
			state.isLoading = false;
		});
		// ошибка при запросе данных
		builder.addCase(fetchCart.rejected, (state, action) => {
			// сохраняем в состоянии текст сообщения об ошибке, который ранее вручную извлекли из ответа
			state.errorMessage = action.error.message;
			// снимаем флаг загрузки (данные со старыми пиццами уже были очищены в pending)
			state.isLoading = false;
		});
		// ДОБАВЛЕНИЕ ТОВАРА В КОРЗИНУ
		// успешно
		builder.addCase(addPizza.fulfilled, (state, action: PayloadAction<ProductInCard>) => {
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
			// снимаем флаг загрузки
			state.isLoading = false;
		});
		// ошибка
		builder.addCase(addPizza.rejected, (state) => {
			// снимаем флаг загрузки
			state.isLoading = false;
		});
		// ОЧИСТКА КОРЗИНЫ
		// успешно (возвращаем состояние как при инициализации)
		builder.addCase(clearCart.fulfilled, () => initialState);
		// ошибка
		builder.addCase(clearCart.rejected, (state) => {
			// снимаем флаг загрузки
			state.isLoading = false;
		});
		// УДАЛЕНИЕ ТОВАРА ИЗ КОРЗИНЫ
		// успешно
		builder.addCase(deletePizza.fulfilled, (state) => {
			state.isLoading = false;
		});
		// ошибка
		builder.addCase(deletePizza.rejected, (state) => {
			// снимаем флаг загрузки
			state.isLoading = false;
		});
		// УДАЛЕНИЕ КОЛ-ВА ТОВАРА В КОРЗИНЕ
		// успешно
		builder.addCase(decrementCountPizza.fulfilled, (state) => {
			state.isLoading = false;
		});
		// ошибка
		builder.addCase(decrementCountPizza.rejected, (state) => {
			// снимаем флаг загрузки
			state.isLoading = false;
		});
	}
});

// создаем селектор, который будет возвращать часто используемую функцию по возврату состояния из redux,
// чтобы далее ее переиспользовать вместо того, чтобы всегда писать useSelector((state: RootState) => state.cart) при получении состояния
export const selectCart = (state: RootState) => state.cart;

// экспортируем (сразу диструктуризируя) функции (методы) по изменению состояния
export const {
	decrementPizza,
	removePizza,
} = cartSlice.actions;
// экспортируем по умолчанию редюсер (в store при импорте именуется как filterReducer)
export default cartSlice.reducer;