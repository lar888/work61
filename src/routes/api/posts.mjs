import { Router } from 'express'
import {
	getPostAPI, getPostsAPI,
	createPostAPI,
	replacePostAPI,
	updatePostAPI,
	deletePostAPI
} from '../../controllers/postController.mjs'
import {
	validatePostCreateRequest,
	validatePostPutRequest,
	validatePostPatchRequest
} from '../../middleware/postsValidation.mjs'

const router = Router()

// /api/posts
router
	.route('/')
	.get(getPostsAPI) // GET /api/posts - отримати всі пости
	.post(validatePostCreateRequest, createPostAPI) // POST /api/posts - створити новий пост

// /api/posts/:id
router
	.route('/:id')
	.get(getPostAPI) // GET /api/posts/:id - отримати пост за ID
	.put(validatePostPutRequest, replacePostAPI) // PUT /api/posts/:id - повне оновлення посту
	.patch(validatePostPatchRequest, updatePostAPI) // PATCH /api/posts/:id - часткове оновлення посту
	.delete(deletePostAPI) // DELETE /api/posts/:id - видалити пост

export default router