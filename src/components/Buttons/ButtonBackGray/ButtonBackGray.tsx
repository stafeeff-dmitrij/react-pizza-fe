import * as React from 'react';
import { ButtonHTMLAttributes } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

import styles from '../ButtonBackGray/ButtonBackGray.module.scss';


/**
 * @component
 * @description Кнопка возврата на главную страницу
 * @prop {string} className - стили
 */
const ButtonBackGray: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ className }) => {

	const navigate = useNavigate();

	return (
		<button className={cn('button', styles['go-back-btn'], className)} onClick={() => navigate('/')}>
			<svg
				width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M7 13L1 6.93015L6.86175 1" stroke="#D3D3D3" strokeWidth="1.5"
					strokeLinecap="round" strokeLinejoin="round"
				/>
			</svg>
			<span className={styles['text']}>Вернуться назад</span>
		</button>
	);
}

export default ButtonBackGray;