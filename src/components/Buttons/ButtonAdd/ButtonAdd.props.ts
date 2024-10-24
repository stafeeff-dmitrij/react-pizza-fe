import * as React from 'react';
export interface ButtonAddProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	count: number; // кол-во товара
	onClickAdd: (event: React.MouseEvent<HTMLButtonElement>) => void; // обработчик клика для добавления товара в корзину
}