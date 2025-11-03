import { HTTP_STATUS } from '../config/http.mjs'
import {
	getAllCategories,
	getCategoryById,
	addCategory,
	replaceCategory,
	deleteCategory,
	getNextId,
	patchCategory,
} from '../models/categories.mjs'
import * as logger from '../utils/logger.mjs'

// API: Отримання списку категорій (JSON)
export const getCategoriesAPI = (req, res) => {
	try {
		logger.log('API: Отримання списку категорій')
		const list = getAllCategories()

		res.status(HTTP_STATUS.OK).json({
			success: true,
			data: list,
			count: list.length
		})
	} catch (error) {
		logger.error('API: Помилка при отриманні списку категорій:', error)
		res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
			success: false,
			error: 'Внутрішня помилка сервера'
		})
	}
}

// API: Отримання категорії за ID (JSON)
export const getCategoryAPI = (req, res) => {
	try {
		const { id } = req.params
		const category = getCategoryById(id)

		if (!category) {
			logger.log(`API: Категорія з ID ${id} не знайдена`)
			return res.status(HTTP_STATUS.NOT_FOUND).json({
				success: false,
				error: 'Категорія не знайдена'
			})
		}

		logger.log(`API: Отримання категорії з ID ${id}`)
		res.status(HTTP_STATUS.OK).json({
			success: true,
			data: category
		})
	} catch (error) {
		logger.error('API: Помилка при отриманні категорії:', error)
		res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
			success: false,
			error: 'Внутрішня помилка сервера'
		})
	}
}

// API: Створення нової категорії (JSON)
export const createCategoryAPI = (req, res) => {
	try {
		logger.log('API: Створення нової категорії')

		const category = {
			id: getNextId(),
			...req.validatedCategory
		}

		const newCategory = addCategory(category)
		logger.log('API: Категорія успішно створена', category)
		res.status(HTTP_STATUS.CREATED).json({
			success: true,
			data: newCategory,
			message: 'Категорія успішно створена'
		})
	} catch (error) {
		logger.error('API: Помилка при створенні категорії:', error)
		res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
			success: false,
			error: 'Внутрішня помилка сервера'
		})
	}
}

export const updateCategoryAPI = (req, res) => {
	try {
		const { id } = req.params
		logger.log(`API: Часткове оновлення категорії (PATCH) з ID ${id}`)

		const updatedCategory = patchCategory(id, req.validatedCategoryUpdates)

		if (!updatedCategory) {
			logger.log(`API: Категорія з ID ${id} не знайдена для оновлення`)
			return res.status(HTTP_STATUS.NOT_FOUND).json({
				success: false,
				error: 'Категорія не знайдена'
			})
		}

		logger.log('API: Категорія успішно оновлена', updatedCategory)
		res.status(HTTP_STATUS.OK).json({
			success: true,
			data: updatedCategory,
			message: 'Категорія успішно оновлена'
		})
	} catch (error) {
		logger.error('API: Помилка при оновленні категорії:', error)
		res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
			success: false,
			error: 'Внутрішня помилка сервера'
		})
	}
}

// API: Видалення категорії (JSON)
export const deleteCategoryAPI = (req, res) => {
	try {
		const { id } = req.params
		logger.log(`API: Видалення категорії з ID ${id}`)

		const deletedCategory = deleteCategory(id)

		if (!deletedCategory) {
			logger.log(`API: Категорія з ID ${id} не знайдена для видалення`)
			return res.status(HTTP_STATUS.NOT_FOUND).json({
				success: false,
				error: 'Категорія не знайдена'
			})
		}

		logger.log('API: Категорія успішно видалена', deletedCategory)
		res.status(HTTP_STATUS.OK).json({
			success: true,
			data: deletedCategory,
			message: 'Категорія успішно видалена'
		})
	} catch (error) {
		logger.error('API: Помилка при видаленні категорії:', error)
		res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
			success: false,
			error: 'Внутрішня помилка сервера'
		})
	}
}

// API: Оновлення категорії (PUT)
export const replaceCategoryAPI = (req, res) => {
	try {
		const { id } = req.params
		const newCategoryData = req.validatedCategory

		logger.log(`API: Повна заміна категорії (PUT) з ID ${id}`)

		const replacedCategory = replaceCategory(id, newCategoryData)

		if (!replacedCategory) {
			logger.log(`API: Категорія з ID ${id} не знайдена для заміни`)
			return res.status(HTTP_STATUS.NOT_FOUND).json({
				success: false,
				error: 'Категорія не знайдена'
			})
		}

		logger.log('API: Категорія успішно оновлена (PUT)', replacedCategory)
		res.status(HTTP_STATUS.OK).json({
			success: true,
			data: replacedCategory,
			message: 'Категорія успішно оновлена'
		})
	} catch (error) {
		logger.error('API: Помилка при PUT оновленні категорії:', error)
		res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
			success: false,
			error: 'Внутрішня помилка сервера'
		})
	}
}