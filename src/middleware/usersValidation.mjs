import { validatePatchUser, validatePutUser } from '../models/users.mjs'
import { buildErrorResponse } from '../utils/functions.mjs'

// === POST /api/users ===
export const validateUserCreateRequest = (req, res, next) => {
	const payload = {
		member:
			typeof req.body?.member === 'string' ? req.body.member.trim() : '',
		description:
			typeof req.body?.description === 'string'
				? req.body.description.trim()
				: '',
		image:
			typeof req.body?.image === 'string' ? req.body.image.trim() : '',
	}

	if (!validatePutUser(payload)) {
		return buildErrorResponse(
			res,
			'Невірні дані учасників команди: перевірте member, description та image'
		)
	}

	req.validatedUser = payload
	next()
}

// === PUT /api/users/:id ===
export const validateUserPutRequest = (req, res, next) => {
	const payload = {
		member:
			typeof req.body?.member === 'string' ? req.body.member.trim() : '',
		description:
			typeof req.body?.description === 'string'
				? req.body.description.trim()
				: '',
		image:
			typeof req.body?.image === 'string' ? req.body.image.trim() : '',
	}

	if (!validatePutUser(payload)) {
		return buildErrorResponse(
			res,
			'Невірні дані учасників команди: перевірте member, description та image'
		)
	}

	req.validatedUser = payload
	next()
}

// === PATCH /api/users/:id ===
export const validateUserPatchRequest = (req, res, next) => {
	const updates = {}

	if ('member' in req.body)
		updates.member =
			typeof req.body.member === 'string' ? req.body.member.trim() : req.body.member

	if ('description' in req.body)
		updates.description =
			typeof req.body.description === 'string'
				? req.body.description.trim()
				: req.body.description

	if ('image' in req.body)
		updates.image =
			typeof req.body.image === 'string' ? req.body.image.trim() : req.body.image

	if (!validatePatchUser(updates)) {
		return buildErrorResponse(res, 'Невірні дані учасників команди: перевірте поля, що оновлюються')
	}

	req.validatedUserUpdates = updates
	next()
}
