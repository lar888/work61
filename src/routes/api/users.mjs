import { Router } from 'express'
import {
	getUserAPI, getUsersAPI,
	createUserAPI,
	replaceUserAPI,
	updateUserAPI,
	deleteUserAPI
} from '../../controllers/usersController.mjs'
import {
	validateUserCreateRequest,
	validateUserPutRequest,
	validateUserPatchRequest
} from '../../middleware/usersValidation.mjs'

const router = Router()

// /users - колекція членів команди
router
	.route('/')
	.get(getUsersAPI) // GET /users - список членів команди
	.post(validateUserCreateRequest, createUserAPI) // POST /api/users - створити нового учасника команди

// /api/users/:id
router
	.route('/:id')
	.get(getUserAPI) // GET /api/users/:id - отримати учасника команди за ID
	.put(validateUserPutRequest, replaceUserAPI) // PUT /api/users/:id - повне оновлення учасника команди
	.patch(validateUserPatchRequest, updateUserAPI) // PATCH /api/users/:id - часткове оновлення учасника команди
	.delete(deleteUserAPI) // DELETE /api/users/:id - видалити учасника команди

export default router