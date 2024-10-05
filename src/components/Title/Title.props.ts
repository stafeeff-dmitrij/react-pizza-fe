import { HTMLAttributes, ReactNode } from "react";

export interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
	// типизация дочернего компонента - может быть любым react-овским компонентом
	children: ReactNode;
}