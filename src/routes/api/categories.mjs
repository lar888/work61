import { Router } from 'express'
import {
	getCategoryAPI, getCategoriesAPI,
	createCategoryAPI,
	replaceCategoryAPI,
	deleteCategoryAPI
} from '../../controllers/categoryController.mjs'
import {
	validateCategoryCreateRequest,
	validateCategoryPutRequest
} from '../../middleware/categoriesValidation.mjs'

const router = Router()

// /categories - колекція категорій
router
	.route('/')
	.get(getCategoriesAPI) // GET /categories - список категорій
	.post(validateCategoryCreateRequest, createCategoryAPI) // POST /api/categories - створити нову категорію

// /api/categories/:id
router
	.route('/:id')
	.get(getCategoryAPI) // GET /api/categories/:id - отримати категорію за ID
	.put(validateCategoryPutRequest, replaceCategoryAPI) // PUT /api/categories/:id - оновлення категорії
	.delete(deleteCategoryAPI) // DELETE /api/categories/:id - видалити категорію

export default router