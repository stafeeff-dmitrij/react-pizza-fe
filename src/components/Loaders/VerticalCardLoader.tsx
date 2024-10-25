import ContentLoader from 'react-content-loader';

/**
 * @component
 * @description Лоадер для вертикальной карточки товара
 */
function VerticalCardLoader() {
	return (
		<ContentLoader
			speed={1}
			width={280}
			height={459}
			viewBox="0 0 280 459"
			backgroundColor="#f3f3f3"
			foregroundColor="#ecebeb"
		>
			<circle cx="130" cy="131" r="125"/>
			<rect x="0" y="271" rx="10" ry="10" width="280" height="24"/>
			<rect x="0" y="317" rx="10" ry="10" width="280" height="85"/>
			<rect x="0" y="423" rx="10" ry="10" width="90" height="27"/>
			<rect x="125" y="418" rx="20" ry="20" width="155" height="40"/>
		</ContentLoader>
	);
}

export default VerticalCardLoader;