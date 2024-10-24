import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import cn from 'classnames';

import Title from '../../components/Title/Title.tsx';
import ButtonBackGray from '../../components/Buttons/ButtonBackGray/ButtonBackGray.tsx';
import { getFirstUppercase } from '../../utils/ingredients.ts';
import { useGetPizzaByIdQuery } from '../../redux/api/pizzaApi.ts';

import styles from './PizzaDetail.module.scss';


/**
 * @component
 * @description Страница с детальной информацией о пицце
 */
function PizzaDetail() {

	const navigate = useNavigate();

	// достаем id из URL
	const { id } = useParams();
	const { data, isSuccess, isLoading, isError, error } = useGetPizzaByIdQuery(id);

	useEffect(() => {
		if (isError) {
			console.error(error);
			alert('Ошибка при получении пиццы');
			navigate('/');
		}
	}, [isError, error]);

	return (
		<div className={cn('container', styles['wrapper'])}>
			{isLoading && <p>Идет загрузка...</p>}
			{isSuccess &&
				<>
					<div className={styles['page']}>
						<img className={styles['image']} src={data.image} alt={data.name}/>
						<div className={styles['body']}>
							<Title>{data.name}</Title>
							<div className={styles['description-block']}>
								<div className={styles['ingredients']}>
									<b>Ингредиенты:</b>
									<ul className={styles['items']}>
										{data.description.split(',').map((ingredient: string, index: number) =>
											<li key={index} className={styles['item']}>
												{getFirstUppercase(ingredient)}
											</li>)}
									</ul>
								</div>
								<div className={styles['price-block']}>
									<b>Цена:</b>
									<p className={styles['price']}>от {data.price} ₽</p>
								</div>
							</div>
							<ButtonBackGray className={styles['padding-left']}/>
						</div>
					</div>
				</>
			}
		</div>
	);
}

export default PizzaDetail;