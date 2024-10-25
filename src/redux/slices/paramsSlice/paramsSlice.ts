import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../store.ts';
import { DoughType, Params, Size } from './paramsSlice.props.ts';


// начальное состояние
const initialState: Params = {
	doughTypes: [],
	sizes: [],
};

export const paramsSlice = createSlice({
	// уникальное название слайса (отображается в devtools)
	name: 'params',
	// начальное состояние
	initialState,
	reducers: {
		// сохранение параметров типов теста
		setDoughTypes: (state, action: PayloadAction<DoughType[]>) => {
			state.doughTypes = action.payload;
		},
		// сохранение параметров размеров пицц
		setSizes: (state, action: PayloadAction<Size[]>) => {
			state.sizes = action.payload;
		},
	},
});

// создаем селектор, который будет возвращать часто используемую функцию по возврату состояния из redux,
// чтобы далее ее переиспользовать вместо того, чтобы всегда писать useSelector((state: RootState) => state.params) при получении состояния
export const selectParams = (state: RootState) => state.params;

// экспортируем (сразу диструктуризируя) функции (методы) по изменению состояния
export const {setDoughTypes, setSizes} = paramsSlice.actions;
// экспортируем по умолчанию редюсер (в store при импорте именуется как filterReducer)
export default paramsSlice.reducer;