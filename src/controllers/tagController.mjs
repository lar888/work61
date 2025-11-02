import { HTTP_STATUS } from '../config/http.mjs'
import {
	getAllTags,
	getTagById,
	addTag,
	replaceTag,
	deleteTag,
	getNextId,
} from '../models/tags.mjs'
import * as logger from '../utils/logger.mjs'

// API: Отримання списку тегів (JSON)
export const getTagsAPI = (req, res) => {
	try {
		logger.log('API: Отримання списку тегів')
		const list = getAllTags()

		res.status(HTTP_STATUS.OK).json({
			success: true,
			data: list,
			count: list.length
		})
	} catch (error) {
		logger.error('API: Помилка при отриманні списку тегів:', error)
		res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
			success: false,
			error: 'Внутрішня помилка сервера'
		})
	}
}

// API: Отримання тега за ID (JSON)
export const getTagAPI = (req, res) => {
	try {
		const { id } = req.params
		const tag = getTagById(id)

		if (!tag) {
			logger.log(`API: Тег з ID ${id} не знайдений`)
			return res.status(HTTP_STATUS.NOT_FOUND).json({
				success: false,
				error: 'Тег не знайдений'
			})
		}

		logger.log(`API: Отримання тега з ID ${id}`)
		res.status(HTTP_STATUS.OK).json({
			success: true,
			data: tag
		})
	} catch (error) {
		logger.error('API: Помилка при отриманні тега:', error)
		res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
			success: false,
			error: 'Внутрішня помилка сервера'
		})
	}
}

// API: Створення нового тега (JSON)
export const createTagAPI = (req, res) => {
	try {
		logger.log('API: Створення нового тега')

		const tag = {
			id: getNextId(),
			...req.validatedTag
		}

		const newTag = addTag(tag)
		logger.log('API: Тег успішно створений', tag)
		res.status(HTTP_STATUS.CREATED).json({
			success: true,
			data: newTag,
			message: 'Тег успішно створений'
		})
	} catch (error) {
		logger.error('API: Помилка при створенні тега:', error)
		res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
			success: false,
			error: 'Внутрішня помилка сервера'
		})
	}
}

// API: Видалення тега (JSON)
export const deleteTagAPI = (req, res) => {
	try {
		const { id } = req.params
		logger.log(`API: Видалення тега з ID ${id}`)

		const deletedTag = deleteTag(id)

		if (!deletedTag) {
			logger.log(`API: Тег з ID ${id} не знайдений для видалення`)
			return res.status(HTTP_STATUS.NOT_FOUND).json({
				success: false,
				error: 'Тег не знайдений'
			})
		}

		logger.log('API: Тег успішно видалений', deletedTag)
		res.status(HTTP_STATUS.OK).json({
			success: true,
			data: deletedTag,
			message: 'Тег успішно видалений'
		})
	} catch (error) {
		logger.error('API: Помилка при видаленні тега:', error)
		res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
			success: false,
			error: 'Внутрішня помилка сервера'
		})
	}
}

// API: Оновлення тега (PUT)
export const replaceTagAPI = (req, res) => {
	try {
		const { id } = req.params
		const newTagData = req.validatedTag

		logger.log(`API: Повна заміна тега (PUT) з ID ${id}`)

		const replacedTag = replaceTag(id, newTagData)

		if (!replacedTag) {
			logger.log(`API: Тег з ID ${id} не знайдений для заміни`)
			return res.status(HTTP_STATUS.NOT_FOUND).json({
				success: false,
				error: 'Тег не знайдений'
			})
		}

		logger.log('API: Тег успішно оновлений (PUT)', replacedTag)
		res.status(HTTP_STATUS.OK).json({
			success: true,
			data: replacedTag,
			message: 'Тег успішно оновлений'
		})
	} catch (error) {
		logger.error('API: Помилка при PUT оновленні тега:', error)
		res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
			success: false,
			error: 'Внутрішня помилка сервеpа'
		})
	}
}