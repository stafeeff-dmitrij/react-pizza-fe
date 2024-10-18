/// <reference types="vite/client" />

// типизация переменных окружения
interface ImportMetaEnv {
	readonly VITE_BASE_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
