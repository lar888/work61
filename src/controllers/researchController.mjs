import { HTTP_STATUS } from '../config/http.mjs'
import {
	getAllResearch,
	getResearchById,
	addResearch,
	replaceResearch,
	patchResearch,
	deleteResearch,
	getNextId,
} from '../models/research.mjs'
import * as logger from '../utils/logger.mjs'

// API: Отримання списку досліджень (JSON)
export const getResearchAPI = (req, res) => {
	try {
		logger.log('API: Отримання списку досліджень')
		const list = getAllResearch()
		res.status(HTTP_STATUS.OK).json({
			success: true,
			data: list,
			count: list.length
		})
	} catch (error) {
		logger.error('API: Помилка при отриманні списку досліджень:', error)
		res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
			success: false,
			error: 'Внутрішня помилка сервера'
		})
	}
}

// API: Отримання одного дослідження за ID (JSON)
export const getOneResearchAPI = (req, res) => {
	try {
		const { id } = req.params
		const research = getResearchById(id)

		if (!research) {
			logger.log(`API: Дослідження з ID ${id} не знайдено`)
			return res.status(HTTP_STATUS.NOT_FOUND).json({
				success: false,
				error: 'Дослідження не знайдено'
			})
		}

		logger.log(`API: Отримання дослідження з ID ${id}`)
		res.status(HTTP_STATUS.OK).json({
			success: true,
			data: research
		})
	} catch (error) {
		logger.error('API: Помилка при отриманні дослідження:', error)
		res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
			success: false,
			error: 'Внутрішня помилка сервера'
		})
	}
}

// API: Створення нового дослідження (JSON)
export const createResearchAPI = (req, res) => {
	try {
		logger.log('API: Створення нового дослідження')

		const research = {
			id: getNextId(),
			...req.validatedResearch
		}

		addResearch(research)
		logger.log('API: Дослідження успішно створено', research)
		res.status(HTTP_STATUS.CREATED).json({
			success: true,
			data: research,
			message: 'Дослідження успішно створено'
		})
	} catch (error) {
		logger.error('API: Помилка при створенні дослідження:', error)
		res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
			success: false,
			error: 'Внутрішня помилка сервера'
		})
	}
}

// API: Оновлення дослідження (JSON)
export const updateResearchAPI = (req, res) => {
	try {
		const { id } = req.params
		logger.log(`API: Часткове оновлення дослідження (PATCH) з ID ${id}`)

		const updatedResearch = patchResearch(id, req.validatedResearchUpdates)

		if (!updatedResearch) {
			logger.log(`API: Дослідження з ID ${id} не знайдено для оновлення`)
			return res.status(HTTP_STATUS.NOT_FOUND).json({
				success: false,
				error: 'Дослідження не знайдено'
			})
		}

		logger.log('API: Дослідження успішно оновлено', updatedResearch)
		res.status(HTTP_STATUS.OK).json({
			success: true,
			data: updatedResearch,
			message: 'Дослідження успішно оновлено'
		})
	} catch (error) {
		logger.error('API: Помилка при оновленні дослідження:', error)
		res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
			success: false,
			error: 'Внутрішня помилка сервера'
		})
	}
}

// API: Видалення дослідження (JSON)
export const deleteResearchAPI = (req, res) => {
	try {
		const { id } = req.params
		logger.log(`API: Видалення дослідження з ID ${id}`)

		const deletedResearch = deleteResearch(id)

		if (!deletedResearch) {
			logger.log(`API: Дослідження з ID ${id} не знайдено для видалення`)
			return res.status(HTTP_STATUS.NOT_FOUND).json({
				success: false,
				error: 'Дослідження не знайдено'
			})
		}

		logger.log('API: Дослідження успішно видалено', deletedResearch)
		res.status(HTTP_STATUS.OK).json({
			success: true,
			data: deletedResearch,
			message: 'Дослідження успішно видалено'
		})
	} catch (error) {
		logger.error('API: Помилка при видаленні дослідження:', error)
		res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
			success: false,
			error: 'Внутрішня помилка сервера'
		})
	}
}

// API: Повне оновлення дослідження (PUT)
export const replaceResearchAPI = (req, res) => {
	try {
		const { id } = req.params
		const newResearchData = req.validatedResearch

		logger.log(`API: Повна заміна дослідження (PUT) з ID ${id}`)

		const replacedResearch = replaceResearch(id, newResearchData)

		if (!replacedResearch) {
			logger.log(`API: Дослідження з ID ${id} не знайдено для заміни`)
			return res.status(HTTP_STATUS.NOT_FOUND).json({
				success: false,
				error: 'Дослідження не знайдено'
			})
		}

		logger.log('API: Дослідження успішно оновлено (PUT)', replacedResearch)
		res.status(HTTP_STATUS.OK).json({
			success: true,
			data: replacedResearch,
			message: 'Дослідження успішно оновлено'
		})
	} catch (error) {
		logger.error('API: Помилка при PUT оновленні дослідження:', error)
		res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
			success: false,
			error: 'Внутрішня помилка сервера'
		})
	}
}