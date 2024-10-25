export enum DoughTypes {
	SLIM = 'slim',
	TRADITIONAL = 'traditional'
}

export enum DoughNameTypes {
	SLIM = 'Тонкое',
	TRADITIONAL = 'Традиционное'
}

export enum PizzaSizes {
	SMALL = 'small',
	AVERAGE = 'average',
	BIG = 'big'
}

export enum PizzaValueSizes {
	SMALL = 26,
	AVERAGE = 30,
	BIG = 40
}

// используются и ключи (при отправке данных на бэк ), и значения (при отрисовке компонентов) (поэтому ключи с маленькой буквы!)
export enum SortingTypes {
	popular = 'популярности',
	price = 'цене',
	name = 'наименованию'
}