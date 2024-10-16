import Title from '../../components/Title/Title.tsx';
import ButtonBackBlack from '../../components/Buttons/ButtonBackBlack/ButtonBackBlack.tsx';

import styles from './NotFound.module.scss';


/**
 * @component
 * @description Страница 404
 */
function NotFound() {
	return (
		<div className={styles['page']}>
			<Title>Ничего не найдено :(</Title>
			<ButtonBackBlack/>
		</div>
	);
}

export default NotFound;