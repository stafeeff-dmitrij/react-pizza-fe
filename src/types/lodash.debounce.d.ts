// т.к. пакет lodash.debounce не предоставляет типизацию, пишем свою декларацию модуля,
// чтобы TS понимал какие типы данных возвращает импортируемая из lodash.debounce переменная
declare module 'lodash.debounce' {
	export default function debounce<T extends (...args: any[]) => any>(
		func: T,
		wait?: number,
		options?: { leading?: boolean; trailing?: boolean }
	): T;
}