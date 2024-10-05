import { TitleProps } from './Title.props.ts';

import styles from './Title.module.scss';

/**
 * @component
 * @description Заголовок H1
 * @prop {Object} children - текст заголовка
 */
const Title = ({ children }: TitleProps) => {
	return (
		<h1 className={styles['title']}>{children}</h1>
	);
};

export default Title;