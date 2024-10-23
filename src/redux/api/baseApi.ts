import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import getEnvVariables from '../../helpers/envVariables.ts';

// переменные окружения
const envVariables = getEnvVariables();


// базовая функция для кэшированных запросов с бэка
export const baseApi = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({ baseUrl: `${envVariables.BASE_URL}` }),
	tagTypes: ['categories', 'doughTypes', 'Sizes'],
	endpoints: () => ({}),
});