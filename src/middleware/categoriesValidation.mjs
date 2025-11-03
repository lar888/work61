import { validatePatchCategory, validatePutCategory } from '../models/categories.mjs'
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

// === PATCH /api/categories/:id ===
export const validateCategoryPatchRequest = (req, res, next) => {
	const updates = {}

	if ('title' in req.body)
		updates.title =
			typeof req.body.title === 'string' ? req.body.title.trim() : req.body.title

	if (!validatePatchCategory(updates)) {
		return buildErrorResponse(res, 'Невірні дані категорії: перевірте поля, що оновлюються')
	}

	req.validatedCategoryUpdates = updates
	next()
}
