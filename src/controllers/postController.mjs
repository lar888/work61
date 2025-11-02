import { HTTP_STATUS } from '../config/http.mjs'
import {
	getAllPosts,
	getPostById,
	addPost,
	replacePost,
	patchPost,
	deletePost,
	categories,
	tags,
	postTags
} from '../models/posts.mjs'

import * as logger from '../utils/logger.mjs'

export const mapPostRelations = (post) => {
	const categoryObj = categories.find(c => c.id === post.category_id)
	const tagIds = postTags.filter(pt => pt.post_id === post.id).map(pt => pt.tag_id)
	const tagNames = tags.filter(t => tagIds.includes(t.id)).map(t => t.title)

	return {
		id: post.id,
		title: post.title,
		description: post.description,
		year: post.year,
		image: post.image,
		selected: post.selected ?? false,
		category: categoryObj?.title || null,
		tags: tagNames
	}
}

// API: Отримання списку постів (JSON)
export const getPostsAPI = (req, res) => {
	try {
		logger.log('API: Отримання списку постів')
		const list = getAllPosts().map(mapPostRelations)
		res.status(HTTP_STATUS.OK).json({
			success: true,
			data: list,
			count: list.length
		})
	} catch (error) {
		logger.error('API: Помилка при отриманні списку постів:', error)
		res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
			success: false,
			error: 'Внутрішня помилка сервера'
		})
	}
}

// API: Отримання одного посту за ID (JSON)
export const getPostAPI = (req, res) => {
	try {
		const { id } = req.params
		const post = mapPostRelations(getPostById(id))

		if (!post) {
			logger.log(`API: Пост з ID ${id} не знайдено`)
			return res.status(HTTP_STATUS.NOT_FOUND).json({
				success: false,
				error: 'Пост не знайдено'
			})
		}

		logger.log(`API: Отримання посту з ID ${id}`)
		res.status(HTTP_STATUS.OK).json({
			success: true,
			data: post
		})
	} catch (error) {
		logger.error('API: Помилка при отриманні посту:', error)
		res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
			success: false,
			error: 'Внутрішня помилка сервера'
		})
	}
}

// API: Створення нового посту (JSON)
export const createPostAPI = (req, res) => {
	try {
		logger.log('API: Створення нового посту')

		const newPost = addPost(req.validatedPost)

		res.status(HTTP_STATUS.CREATED).json({
			success: true,
			data: newPost,
			message: 'Пост успішно створено'
		})

	} catch (error) {
		logger.error('API: Помилка при створенні посту:', error)

		res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
			success: false,
			error: error.message || 'Внутрішня помилка сервера'
		})
	}
}

// API: Оновлення посту (JSON)
export const updatePostAPI = (req, res) => {
	try {
		const { id } = req.params

		const updatedPost = patchPost(id, req.validatedPostUpdates)

		if (!updatedPost) {
			return res.status(HTTP_STATUS.NOT_FOUND).json({
				success: false,
				error: 'Пост не знайдено'
			})
		}

		res.status(HTTP_STATUS.OK).json({
			success: true,
			data: mapPostRelations(updatedPost),
			message: 'Пост успішно оновлено'
		})
	} catch (error) {
		logger.error('API: Помилка при оновленні посту:', error)
		res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
			success: false,
			error: 'Внутрішня помилка сервера'
		})
	}
}

// API: Видалення посту (JSON)
export const deletePostAPI = (req, res) => {
	try {
		const { id } = req.params
		const deletedPost = deletePost(id)

		if (!deletedPost) {
			return res.status(HTTP_STATUS.NOT_FOUND).json({
				success: false,
				error: 'Пост не знайдено'
			})
		}

		res.status(HTTP_STATUS.OK).json({
			success: true,
			data: mapPostRelations(deletedPost),
			message: 'Пост успішно видалено'
		})
	} catch (error) {
		logger.error('API: Помилка при видаленні посту:', error)
		res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
			success: false,
			error: 'Внутрішня помилка сервера'
		})
	}
}

// API: Повне оновлення посту (PUT)
export const replacePostAPI = (req, res) => {
	try {
		const { id } = req.params
		const replacedPost = replacePost(id, req.validatedPost)

		if (!replacedPost) {
			return res.status(HTTP_STATUS.NOT_FOUND).json({
				success: false,
				error: 'Пост не знайдено'
			})
		}

		res.status(HTTP_STATUS.OK).json({
			success: true,
			data: replacedPost,
			message: 'Пост успішно оновлено'
		})

	} catch (error) {
		logger.error(error)
		res.status(500).json({ success: false, error: error.message })
	}
}
