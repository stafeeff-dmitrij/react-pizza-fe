import { configureStore } from '@reduxjs/toolkit';

import filterReducer from './slices/filterSlice.ts'


// глобальное хранилище, доступное в любом компоненте
// основное центролизованное хранилище, к которому подключаются слайсы - функции по изменению состояний разных частей приложения
export const store = configureStore({
	reducer: {
		filter: filterReducer
	},
});

// описываем тип возвращаемой структуры при обращении к хранилищу
export type RootState = ReturnType<typeof store.getState>
// описывает тип структуры данных для диспатчинга
export type AppDispatch = typeof store.dispatch