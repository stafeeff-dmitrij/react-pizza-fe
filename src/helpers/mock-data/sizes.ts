import { size } from '../../components/Cards/HorizontalCard/HorizontalCard.props.tsx';


export interface Size {
	id: size;
	value: 26 | 30 | 40;
	price_rise: number;
}

export const sizesConst: Size[] = [
	{
		id: 'small',
		value: 26,
		price_rise: 0
	},
	{
		id: 'average',
		value: 30,
		price_rise: 5
	},
	{
		id: 'big',
		value: 40,
		price_rise: 10
	}
];