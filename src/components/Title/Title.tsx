import { TitleProps } from './Title.props.ts';

import styles from './Title.module.scss';
import cn from 'classnames';

/**
 * @component
 * @description Заголовок H1
 * @prop {Object} children - текст заголовка
 * @prop {Object} className - стили
 */
const Title = ({ children, className }: TitleProps) => {
	return (
		<h1 className={cn(styles['title'], className)}>{children}</h1>
	);
};

export default Title;