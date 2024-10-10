// типизации получаемых данных с бэка о пиццах
export interface Pizza {
	id: number;
	name: string;
	image: string;
	price: number;
	category_id: number;
}