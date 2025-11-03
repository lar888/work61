import { Router } from 'express'
import {
	getTagAPI, getTagsAPI,
	createTagAPI,
	replaceTagAPI,
	deleteTagAPI,
	updateTagAPI
} from '../../controllers/tagController.mjs'
import {
	validateTagCreateRequest,
	validateTagPatchRequest,
	validateTagPutRequest
} from '../../middleware/tagsValidation.mjs'

const router = Router()

// /tags - колекція тегів
router
	.route('/')
	.get(getTagsAPI) // GET /tags - список тегів
	.post(validateTagCreateRequest, createTagAPI) // POST /api/tags - створити новий тег

// /api/tags/:id
router
	.route('/:id')
	.get(getTagAPI) // GET /api/tags/:id - отримати тег за ID
	.put(validateTagPutRequest, replaceTagAPI) // PUT /api/tags/:id - оновлення тега
	.patch(validateTagPatchRequest, updateTagAPI) // PATCH /api/tags/:id - часткове оновлення тега
	.delete(deleteTagAPI) // DELETE /api/tags/:id - видалити тег

export default router