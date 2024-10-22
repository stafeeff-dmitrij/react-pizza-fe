import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import cn from 'classnames';

import getEnvVariables from '../../helpers/envVariables.ts';
import { PizzaDetail as PizzaDetailInterface } from './PizzaDetail.props.ts';
import Title from '../../components/Title/Title.tsx';
import ButtonBackGray from '../../components/Buttons/ButtonBackGray/ButtonBackGray.tsx';
import { getFirstUppercase } from '../../utils/ingredients.ts';

import styles from './PizzaDetail.module.scss';


/**
 * @component
 * @description Страница с детальной информацией о пицце
 */
function PizzaDetail() {

	// переменные окружения
	const envVariables = getEnvVariables();

	const navigate = useNavigate();

	// достаем id из URL
	const { id } = useParams();

	const [pizza, setPizza] = useState<PizzaDetailInterface>();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const getPizza = async () => {
		try {
			setIsLoading(true);
			const { data } = await axios.get<PizzaDetailInterface>(`${envVariables.BASE_URL}/pizzas/${id}`);
			setPizza(data);
		} catch (error) {
			if (error instanceof AxiosError) {
				console.error(error.message);
				alert('Ошибка при получении пиццы');
				navigate('/');
			}
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getPizza();
	}, []);

	return (
		<div className={cn('container', styles['wrapper'])}>
			{isLoading && <p>Идет загрузка...</p>}
			{!isLoading &&
				<>
					<div className={styles['page']}>
						<img className={styles['image']} src={pizza?.image} alt={pizza?.name}/>
						<div className={styles['body']}>
							<Title>{pizza?.name}</Title>
							<div className={styles['description-block']}>
								<div className={styles['ingredients']}>
									<b>Ингредиенты:</b>
									<ul className={styles['items']}>
										{pizza?.description.split(',').map((ingredient, index) =>
											<li key={index} className={styles['item']}>
												{getFirstUppercase(ingredient)}
											</li>)}
									</ul>
								</div>
								<div className={styles['price-block']}>
									<b>Цена:</b>
									<p className={styles['price']}>от {pizza?.price} ₽</p>
								</div>
							</div>
							<ButtonBackGray className={styles['padding-left']} />
						</div>
					</div>
				</>
			}
		</div>
	);
}

export default PizzaDetail;