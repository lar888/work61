import { validatePatchTag, validatePutTag } from '../models/tags.mjs'
import { buildErrorResponse } from '../utils/functions.mjs'

// === POST /api/tags ===
export const validateTagCreateRequest = (req, res, next) => {
	const payload = {
		title: typeof req.body?.title === 'string' ? req.body.title.trim() : ''
	}

	if (!validatePutTag(payload)) {
		return buildErrorResponse(res, 'Невірні дані тега: перевірте title')
	}

	req.validatedTag = payload
	next()
}

// === PUT /api/tags/:id ===
export const validateTagPutRequest = (req, res, next) => {
	const payload = {
		title: typeof req.body?.title === 'string' ? req.body.title.trim() : ''
	}

	if (!validatePutTag(payload)) {
		return buildErrorResponse(res, 'Невірні дані тега: перевірте title')
	}

	req.validatedTag = payload
	next()
}

// === PATCH /api/tags/:id ===
export const validateTagPatchRequest = (req, res, next) => {
	const updates = {}

	if ('title' in req.body)
		updates.title =
			typeof req.body.title === 'string' ? req.body.title.trim() : req.body.title

	if (!validatePatchTag(updates)) {
		return buildErrorResponse(res, 'Невірні дані тега: перевірте поля, що оновлюються')
	}

	req.validatedTagUpdates = updates
	next()
}
