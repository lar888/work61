import { validatePatchNews, validatePutNews } from '../models/news.mjs'
import { buildErrorResponse, validateAndFormatDate } from '../utils/functions.mjs'

// === POST /api/news ===
export const validateNewsCreateRequest = (req, res, next) => {
	const formattedDate = validateAndFormatDate(req, res)
	if (!formattedDate) return

	const payload = {
		description:
			typeof req.body?.description === 'string' ? req.body.description.trim() : '',
		date: formattedDate,
		image:
			typeof req.body?.image === 'string' ? req.body.image.trim() : ''
	}

	if (!validatePutNews(payload)) {
		return buildErrorResponse(res, 'Невірні дані новини: перевірте description, date та image')
	}

	req.validatedNews = payload
	next()
}

// === PUT /api/news/:id ===
export const validateNewsPutRequest = (req, res, next) => {
	const formattedDate = validateAndFormatDate(req, res)
	if (!formattedDate) return

	const payload = {
		description:
			typeof req.body?.description === 'string' ? req.body.description.trim() : '',
		date: formattedDate,
		image:
			typeof req.body?.image === 'string' ? req.body.image.trim() : ''
	}

	if (!validatePutNews(payload)) {
		return buildErrorResponse(res, 'Невірні дані новини: перевірте description, date та image')
	}

	req.validatedNews = payload
	next()
}

// === PATCH /api/news/:id ===
export const validateNewsPatchRequest = (req, res, next) => {
	const updates = {}

	if ('description' in req.body) {
		updates.description =
			typeof req.body.description === 'string'
				? req.body.description.trim()
				: req.body.description
	}

	if ('date' in req.body) {
		const formattedDate = validateAndFormatDate(req, res)
		if (!formattedDate) return
		updates.date = formattedDate
	}

	if ('image' in req.body) {
		updates.image =
			typeof req.body.image === 'string' ? req.body.image.trim() : req.body.image
	}

	if (!validatePatchNews(updates)) {
		return buildErrorResponse(
			res,
			'Невірні дані новини: перевірте поля, що оновлюються'
		)
	}

	req.validatedNewsUpdates = updates
	next()
}
