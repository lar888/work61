import { validatePatchResearch, validatePutResearch } from '../models/research.mjs'
import { buildErrorResponse } from '../utils/functions.mjs'

// === POST /api/research ===
export const validateResearchCreateRequest = (req, res, next) => {
	const payload = {
		title:
			typeof req.body?.title === 'string' ? req.body.title.trim() : '',
		description:
			typeof req.body?.description === 'string'
				? req.body.description.trim()
				: '',
		image:
			typeof req.body?.image === 'string' ? req.body.image.trim() : '',
	}

	if (!validatePutResearch(payload)) {
		return buildErrorResponse(
			res,
			'Невірні дані дослідження: перевірте title, description та image'
		)
	}

	req.validatedResearch = payload
	next()
}

// === PUT /api/research/:id ===
export const validateResearchPutRequest = (req, res, next) => {
	const payload = {
		title:
			typeof req.body?.title === 'string' ? req.body.title.trim() : '',
		description:
			typeof req.body?.description === 'string'
				? req.body.description.trim()
				: '',
		image:
			typeof req.body?.image === 'string' ? req.body.image.trim() : '',
	}

	if (!validatePutResearch(payload)) {
		return buildErrorResponse(
			res,
			'Невірні дані дослідження: перевірте title, description та image'
		)
	}

	req.validatedResearch = payload
	next()
}

// === PATCH /api/research/:id ===
export const validateResearchPatchRequest = (req, res, next) => {
	const updates = {}

	if ('title' in req.body)
		updates.title =
			typeof req.body.title === 'string' ? req.body.title.trim() : req.body.title

	if ('description' in req.body)
		updates.description =
			typeof req.body.description === 'string'
				? req.body.description.trim()
				: req.body.description

	if ('image' in req.body)
		updates.image =
			typeof req.body.image === 'string' ? req.body.image.trim() : req.body.image

	if (!validatePatchResearch(updates)) {
		return buildErrorResponse(res, 'Невірні дані дослідження: перевірте поля, що оновлюються')
	}

	req.validatedResearchUpdates = updates
	next()
}
