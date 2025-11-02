import { HTTP_STATUS } from '../config/http.mjs'
import * as logger from '../utils/logger.mjs'

// Головна сторінка
export const getHomePage = (req, res) => {
	try {
		logger.log('Відображення головної сторінки')

		try {
			res.send('Get root route')
		} catch (sendError) {
			// Handle errors that occur during sending the response
			logger.error('Помилка при відправці відповіді клієнту:', sendError)
			// Attempt to send a fallback response if possible
			if (!res.headersSent) {
				res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send('Помилка при надсиланні відповіді клієнту')
			}
		}
	} catch (error) {
		// Handle unexpected controller-level errors
		logger.error('Помилка при відображенні головної сторінки:', error)
		if (!res.headersSent) {
			res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send('Внутрішня помилка сервера')
		}
	}
}
