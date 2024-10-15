import ContentLoader from 'react-content-loader';

/**
 * @component
 * @description Лоадер для категорий пицц
 */
const CategoriesLoader = () => {
	return (
		<ContentLoader
			speed={1}
			width={139}
			height={45}
			viewBox="0 0 139 45"
			backgroundColor="#f3f3f3"
			foregroundColor="#ecebeb"
		>
			<rect x="0" y="0" rx="20" ry="20" width="138" height="45" />
		</ContentLoader>
	);
};

export default CategoriesLoader;