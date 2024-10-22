import { Pizza } from '../../redux/slices/pizzasSlice.ts';

// типизации получаемых данных о пицце для детальной страницы с бэка
// наследуясь от интерфейса Pizza наследуем все его поля
export interface PizzaDetail extends Pizza {
	description: string;
}