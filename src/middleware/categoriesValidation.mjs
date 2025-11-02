import { validatePutCategory } from '../models/categories.mjs'
import { buildErrorResponse } from '../utils/functions.mjs'

// === POST /api/categories ===
export const validateCategoryCreateRequest = (req, res, next) => {
	const payload = {
		title: typeof req.body?.title === 'string' ? req.body.title.trim() : ''
	}

	if (!validatePutCategory(payload)) {
		return buildErrorResponse(res, 'Невірні дані категорії: перевірте title')
	}

	req.validatedCategory = payload
	next()
}

// === PUT /api/categories/:id ===
export const validateCategoryPutRequest = (req, res, next) => {
	const payload = {
		title: typeof req.body?.title === 'string' ? req.body.title.trim() : ''
	}

	if (!validatePutCategory(payload)) {
		return buildErrorResponse(res, 'Невірні дані категорії: перевірте title')
	}

	req.validatedCategory = payload
	next()
}
