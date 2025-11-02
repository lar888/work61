import { HTTP_STATUS } from '../config/http.mjs'
import {
	getAllUsers,
	getUserById,
	addUser,
	replaceUser,
	patchUser,
	deleteUser,
	getNextId,
} from '../models/users.mjs'
import * as logger from '../utils/logger.mjs'

// API: Отримання списку учасників команди (JSON)
export const getUsersAPI = (req, res) => {
	try {
		logger.log('API: Отримання списку учасників команди')
		const list = getAllUsers()
		res.status(HTTP_STATUS.OK).json({
			success: true,
			data: list,
			count: list.length
		})
	} catch (error) {
		logger.error('API: Помилка при отриманні списку учасників команди:', error)
		res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
			success: false,
			error: 'Внутрішня помилка сервера'
		})
	}
}

// API: Отримання одного учасника команди за ID (JSON)
export const getUserAPI = (req, res) => {
	try {
		const { id } = req.params
		const user = getUserById(id)

		if (!user) {
			logger.log(`API: Учасник команди з ID ${id} не знайдений`)
			return res.status(HTTP_STATUS.NOT_FOUND).json({
				success: false,
				error: 'Учасник команди не знайдений'
			})
		}

		logger.log(`API: Отримання учасника команди з ID ${id}`)
		res.status(HTTP_STATUS.OK).json({
			success: true,
			data: user
		})
	} catch (error) {
		logger.error('API: Помилка при отриманні учасника команди:', error)
		res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
			success: false,
			error: 'Внутрішня помилка сервера'
		})
	}
}

// API: Створення нового учасника команди (JSON)
export const createUserAPI = (req, res) => {
	try {
		logger.log('API: Створення нового учасника команди')

		const user = {
			id: getNextId(),
			...req.validatedUser
		}

		addUser(user)
		logger.log('API: Учасник команди успішно створений', user)
		res.status(HTTP_STATUS.CREATED).json({
			success: true,
			data: user,
			message: 'Учасник команди успішно створений'
		})
	} catch (error) {
		logger.error('API: Помилка при створенні учасника команди:', error)
		res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
			success: false,
			error: 'Внутрішня помилка сервера'
		})
	}
}

// API: Оновлення учасника команди (JSON)
export const updateUserAPI = (req, res) => {
	try {
		const { id } = req.params
		logger.log(`API: Часткове оновлення учасника команди (PATCH) з ID ${id}`)

		const updatedUser = patchUser(id, req.validatedUserUpdates)

		if (!updatedUser) {
			logger.log(`API: Учасник команди з ID ${id} не знайдений для оновлення`)
			return res.status(HTTP_STATUS.NOT_FOUND).json({
				success: false,
				error: 'Учасник команди не знайдений'
			})
		}

		logger.log('API: Учасник команди успішно оновлений', updatedUser)
		res.status(HTTP_STATUS.OK).json({
			success: true,
			data: updatedUser,
			message: 'Учасник команди успішно оновлений'
		})
	} catch (error) {
		logger.error('API: Помилка при оновленні учасника команди:', error)
		res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
			success: false,
			error: 'Внутрішня помилка сервера'
		})
	}
}

// API: Видалення учасника команди (JSON)
export const deleteUserAPI = (req, res) => {
	try {
		const { id } = req.params
		logger.log(`API: Видалення учасника команди з ID ${id}`)

		const deletedUser = deleteUser(id)

		if (!deletedUser) {
			logger.log(`API: Учасник команди з ID ${id} не знайдений для видалення`)
			return res.status(HTTP_STATUS.NOT_FOUND).json({
				success: false,
				error: 'Учасник команди не знайдений'
			})
		}

		logger.log('API: Учасник команди успішно видалений', deletedUser)
		res.status(HTTP_STATUS.OK).json({
			success: true,
			data: deletedUser,
			message: 'Учасник команди успішно видалений'
		})
	} catch (error) {
		logger.error('API: Помилка при видаленні учасника команди:', error)
		res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
			success: false,
			error: 'Внутрішня помилка сервера'
		})
	}
}

// API: Повне оновлення учасника команди (PUT)
export const replaceUserAPI = (req, res) => {
	try {
		const { id } = req.params
		const newUserData = req.validatedUser

		logger.log(`API: Повна заміна учасника команди (PUT) з ID ${id}`)

		const replacedUser = replaceUser(id, newUserData)

		if (!replacedUser) {
			logger.log(`API: Учасник команди з ID ${id} не знайдений для заміни`)
			return res.status(HTTP_STATUS.NOT_FOUND).json({
				success: false,
				error: 'Учасник команди не знайдений'
			})
		}

		logger.log('API: Учасник команди успішно оновлений (PUT)', replacedUser)
		res.status(HTTP_STATUS.OK).json({
			success: true,
			data: replacedUser,
			message: 'Учасник команди успішно оновлений'
		})
	} catch (error) {
		logger.error('API: Помилка при PUT оновленні учасника команди:', error)
		res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
			success: false,
			error: 'Внутрішня помилка сервера'
		})
	}
}