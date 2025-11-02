import { HTTP_STATUS } from '../config/http.mjs'
import {
	getAllNews,
	getNewsById,
	addNews,
	replaceNews,
	patchNews,
	deleteNews,
	getNextId,
} from '../models/news.mjs'
import * as logger from '../utils/logger.mjs'

// API: Отримання списку новин (JSON)
export const getNewsAPI = (req, res) => {
	try {
		logger.log('API: Отримання списку новин')
		const list = getAllNews()
		res.status(HTTP_STATUS.OK).json({
			success: true,
			data: list,
			count: list.length
		})
	} catch (error) {
		logger.error('API: Помилка при отриманні списку новин:', error)
		res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
			success: false,
			error: 'Внутрішня помилка сервера'
		})
	}
}

// API: Отримання однієї новини за ID (JSON)
export const getOneNewsAPI = (req, res) => {
	try {
		const { id } = req.params
		const news = getNewsById(id)

		if (!news) {
			logger.log(`API: Новина з ID ${id} не знайдена`)
			return res.status(HTTP_STATUS.NOT_FOUND).json({
				success: false,
				error: 'Новина не знайдена'
			})
		}

		logger.log(`API: Отримання новини з ID ${id}`)
		res.status(HTTP_STATUS.OK).json({
			success: true,
			data: news
		})
	} catch (error) {
		logger.error('API: Помилка при отриманні новини:', error)
		res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
			success: false,
			error: 'Внутрішня помилка сервера'
		})
	}
}

// API: Створення нової новини (JSON)
export const createNewsAPI = (req, res) => {
	try {
		logger.log('API: Створення нової новини')

		const news = {
			id: getNextId(),
			...req.validatedNews
		}

		addNews(news)
		logger.log('API: Новина успішно створена', news)
		res.status(HTTP_STATUS.CREATED).json({
			success: true,
			data: news,
			message: 'Новина успішно створена'
		})
	} catch (error) {
		logger.error('API: Помилка при створенні новини:', error)
		res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
			success: false,
			error: 'Внутрішня помилка сервера'
		})
	}
}

// API: Оновлення новини (JSON)
export const updateNewsAPI = (req, res) => {
	try {
		const { id } = req.params
		logger.log(`API: Часткове оновлення новини (PATCH) з ID ${id}`)

		const updatedNews = patchNews(id, req.validatedNewsUpdates)

		if (!updatedNews) {
			logger.log(`API: Новина з ID ${id} не знайдена для оновлення`)
			return res.status(HTTP_STATUS.NOT_FOUND).json({
				success: false,
				error: 'Новина не знайдена'
			})
		}

		logger.log('API: Новина успішно оновлена', updatedNews)
		res.status(HTTP_STATUS.OK).json({
			success: true,
			data: updatedNews,
			message: 'Новина успішно оновлена'
		})
	} catch (error) {
		logger.error('API: Помилка при оновленні новини:', error)
		res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
			success: false,
			error: 'Внутрішня помилка сервера'
		})
	}
}

// API: Видалення новини (JSON)
export const deleteNewsAPI = (req, res) => {
	try {
		const { id } = req.params
		logger.log(`API: Видалення новини з ID ${id}`)

		const deletedNews = deleteNews(id)

		if (!deletedNews) {
			logger.log(`API: Новина з ID ${id} не знайдена для видалення`)
			return res.status(HTTP_STATUS.NOT_FOUND).json({
				success: false,
				error: 'Новина не знайдена'
			})
		}

		logger.log('API: Новина успішно видалена', deletedNews)
		res.status(HTTP_STATUS.OK).json({
			success: true,
			data: deletedNews,
			message: 'Новина успішно видалена'
		})
	} catch (error) {
		logger.error('API: Помилка при видаленні новини:', error)
		res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
			success: false,
			error: 'Внутрішня помилка сервера'
		})
	}
}

// API: Повне оновлення новини (PUT)
export const replaceNewsAPI = (req, res) => {
	try {
		const { id } = req.params
		const newNewsData = req.validatedNews

		logger.log(`API: Повна заміна новини (PUT) з ID ${id}`)

		const replacedNews = replaceNews(id, newNewsData)

		if (!replacedNews) {
			logger.log(`API: Новина з ID ${id} не знайдена для заміни`)
			return res.status(HTTP_STATUS.NOT_FOUND).json({
				success: false,
				error: 'Новина не знайдена'
			})
		}

		logger.log('API: Новина успішно оновлена (PUT)', replacedNews)
		res.status(HTTP_STATUS.OK).json({
			success: true,
			data: replacedNews,
			message: 'Новина успішно оновлена'
		})
	} catch (error) {
		logger.error('API: Помилка при PUT оновленні новини:', error)
		res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
			success: false,
			error: 'Внутрішня помилка сервера'
		})
	}
}