interface EnvVariables {
	BASE_URL: string;
}

/**
 * @function
 * @description Чтение и возврат переменных окружения из .env
 */
const getEnvVariables = (): EnvVariables => {
	return {
		BASE_URL: import.meta.env.VITE_BASE_URL,
	};
};

export default getEnvVariables;