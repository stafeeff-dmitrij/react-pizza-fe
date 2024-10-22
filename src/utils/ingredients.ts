
/**
 * @function
 * @description Перевод первой буквы в верхний регистр
 * @param {string} word - преобразуемое слово
 */
export const getFirstUppercase = (word: string): string => {
	return word.trimStart().charAt(0).toUpperCase() + word.trimStart().slice(1);
}