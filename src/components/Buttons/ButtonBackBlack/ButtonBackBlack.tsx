import { useNavigate } from 'react-router-dom';

import styles from '../ButtonBackBlack/ButtonBackBlack.module.scss';


/**
 * @component
 * @description Кнопка возврата на главную страницу
 */
function ButtonBackBlack() {

	const navigate = useNavigate();

	return (
		<button className={styles['button-back']} onClick={() => navigate('/')}>
			<span className={styles['text']}>Вернуть назад</span>
		</button>
	);
}

export default ButtonBackBlack;