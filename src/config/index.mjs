import 'dotenv/config'

// Конфігурація сервера
export const SERVER_CONFIG = {
	PORT: process.env.PORT || 3000,
	HOST: process.env.HOST || 'localhost',
	ENV: process.env.NODE_ENV || 'development'
}