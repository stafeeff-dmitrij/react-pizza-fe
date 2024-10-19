import { type } from '../../components/Cards/HorizontalCard/HorizontalCard.props.tsx';


export interface DoughType {
	id: type;
	name: 'Тонкое' | 'Традиционное';
	price_rise: number;
}

export const doughTypesConst: DoughType[] = [
	{
		id: 'slim',
		name: 'Тонкое',
		price_rise: 0
	},
	{
		id: 'traditional',
		name: 'Традиционное',
		price_rise: 5
	}
];