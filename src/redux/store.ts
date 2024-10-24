import { configureStore } from '@reduxjs/toolkit';

import pizzaReducer from './slices/pizzasSlice.ts'
import cartReducer from './slices/cartSlice.ts';
import paramsReducer from './slices/paramsSlice.ts';
import { baseApi } from './api/baseApi.ts';


// глобальное хранилище, доступное в любом компоненте
// основное центролизованное хранилище, к которому подключаются слайсы - функции по изменению состояний разных частей приложения
export const store = configureStore({
	reducer: {
		params: paramsReducer,
		pizza: pizzaReducer,
		cart: cartReducer,
		[baseApi.reducerPath]: baseApi.reducer,
	},
	// Добавление промежуточного программного обеспечения api позволяет выполнять кэширование, аннулирование, опрос
	// и другие полезные функции "rtk-запроса"
	middleware: (getMiddleware) => getMiddleware().concat(baseApi.middleware),
	devTools: true,
});

// описываем тип возвращаемой структуры при обращении к хранилищу
export type RootState = ReturnType<typeof store.getState>
// описывает тип структуры данных для диспатчинга
export type AppDispatch = typeof store.dispatch