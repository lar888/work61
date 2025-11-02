import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import cors from 'cors'
import apiRouter from './routes/api/index.mjs'
import webRouter from './routes/web/index.mjs'
import { expressErrorHandler, setupGlobalErrorHandlers } from './middleware/errorHandlers.mjs'
import * as logger from './utils/logger.mjs'
import { HTTP_STATUS } from './config/http.mjs'
import { basicAuth } from './middleware/basicAuth.mjs'
import { SERVER_CONFIG } from './config/index.mjs'

// Отримуємо __dirname для ES модулів
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// Налаштування глобальних обробників помилок
setupGlobalErrorHandlers()

app.use(cors({
	origin: 'http://localhost:5173',
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
	allowedHeaders: ['Content-Type', 'Authorization']
}))

// Middleware для JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Маршрути
app.use('/api', basicAuth, apiRouter) // JSON API endpoints (protected)
app.use('/', webRouter)               // HTML Web Interface

// 404 Handler
app.use((req, res, next) => {
	if (req.path.startsWith('/api/')) {
		return res.status(HTTP_STATUS.NOT_FOUND).json({
			success: false,
			error: 'API endpoint not found',
			path: req.originalUrl
		})
	}

	logger.log(`Сторінку не знайдено: ${req.originalUrl}`)
	res.status(HTTP_STATUS.NOT_FOUND).send('<h1>404 - Page Not Found</h1>')
})

// Express error middleware (має бути після всіх роутів)
app.use(expressErrorHandler)

// Запуск сервера
let server

export const startServer = (port = SERVER_CONFIG.PORT, host = SERVER_CONFIG.HOST) => {
	server = app.listen(port, host, () => {
		logger.log(
			`Express сервер запущено на http://${host}:${port} у середовищі "${SERVER_CONFIG.ENV}"`
		)
	})

	return server
}

export const stopServer = () => {
	if (server) {
		server.close(() => {
			logger.log('Сервер закрито')
		})
	}
}

// Обробка сигналів завершення роботи
process.on('SIGTERM', () => {
	logger.log('SIGTERM отримано, закриваємо сервер')
	stopServer()
	process.exit(0)
})

process.on('SIGINT', () => {
	logger.log('SIGINT отримано, закриваємо сервер')
	stopServer()
	process.exit(0)
})
