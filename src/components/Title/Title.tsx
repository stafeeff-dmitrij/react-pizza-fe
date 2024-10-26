import { FC, memo } from 'react';
import cn from 'classnames';

import { TitleProps } from './Title.props.ts';

import styles from './Title.module.scss';


/**
 * @component
 * @description Заголовок H1
 * @prop {Object} children - текст заголовка
 * @prop {string} className - стили
 */
const Title: FC<TitleProps> = ({ children, className }) => {
	return (
		<h1 className={cn(styles['title'], className)}>{children}</h1>
	);
};

// Оборачиваем в memo, чтобы не было лишних ненужных перерисовок
export default memo(Title);