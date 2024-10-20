/**
 * @function
 * @description Возврат цены в виде строки с двумя знаками после запятой и пробелами между разрядами
 * @param {number} price - стоимость товара
 */
export const formattedPrice = (price: number) => {
	return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};