import { size, type } from '../../components/Cards/HorizontalCard/HorizontalCard.props.tsx';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store.ts';


// типизация данных о типе теста
export interface DoughType {
	id: type;
	name: 'Тонкое' | 'Традиционное';
	price_rise: number;
}

// типизация данных о размерах пицц
export interface Size {
	id: size;
	value: 26 | 30 | 40;
	price_rise: number;
}

// типизация состояния с данными о параметрах пиццы
export interface Params {
	doughTypes: DoughType[];
	sizes: Size[];
}

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