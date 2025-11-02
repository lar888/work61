import { Router } from 'express'
import {
	getOneNewsAPI, getNewsAPI,
	createNewsAPI,
	replaceNewsAPI,
	updateNewsAPI,
	deleteNewsAPI
} from '../../controllers/newsController.mjs'
import {
	validateNewsCreateRequest,
	validateNewsPutRequest,
	validateNewsPatchRequest
} from '../../middleware/newsValidation.mjs'

const router = Router()

// /news - колекція новин
router
	.route('/')
	.get(getNewsAPI) // GET /news - список новин
	.post(validateNewsCreateRequest, createNewsAPI) // POST /api/news - створити нову новину

// /api/news/:id
router
	.route('/:id')
	.get(getOneNewsAPI) // GET /api/news/:id - отримати новину за ID
	.put(validateNewsPutRequest, replaceNewsAPI) // PUT /api/news/:id - повне оновлення новини
	.patch(validateNewsPatchRequest, updateNewsAPI) // PATCH /api/news/:id - часткове оновлення новини
	.delete(deleteNewsAPI) // DELETE /api/news/:id - видалити новину

export default router