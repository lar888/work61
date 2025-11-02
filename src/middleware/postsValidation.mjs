import { validatePatchPost, validatePutPost } from '../models/posts.mjs'
import { buildErrorResponse } from '../utils/functions.mjs'

// === POST /api/posts ===
export const validatePostCreateRequest = (req, res, next) => {
	const payload = {
		title:
			typeof req.body?.title === 'string' ? req.body.title.trim() : '',
		description:
			typeof req.body?.description === 'string'
				? req.body.description.trim()
				: '',
		category:
			typeof req.body?.category === 'string' ? req.body.category.trim() : '',
		tags: Array.isArray(req.body?.tags)
			? req.body.tags.map((t) => (typeof t === 'string' ? t.trim() : t))
			: [],
		year: Number(req.body?.year),
		image:
			typeof req.body?.image === 'string' ? req.body.image.trim() : '',
		selected: Boolean(req.body?.selected)
	}

	if (!validatePutPost(payload)) {
		return buildErrorResponse(
			res,
			'Невірні дані посту: перевірте title, description, category, tags, year, image та selected'
		)
	}

	req.validatedPost = payload
	next()
}

// === PUT /api/posts/:id ===
export const validatePostPutRequest = (req, res, next) => {
	const payload = {
		title:
			typeof req.body?.title === 'string' ? req.body.title.trim() : '',
		description:
			typeof req.body?.description === 'string'
				? req.body.description.trim()
				: '',
		category:
			typeof req.body?.category === 'string' ? req.body.category.trim() : '',
		tags: Array.isArray(req.body?.tags)
			? req.body.tags.map((t) => (typeof t === 'string' ? t.trim() : t))
			: [],
		year: Number(req.body?.year),
		image:
			typeof req.body?.image === 'string' ? req.body.image.trim() : '',
		selected: Boolean(req.body?.selected)
	}

	if (!validatePutPost(payload)) {
		return buildErrorResponse(
			res,
			'Невірні дані посту: перевірте title, description, category, tags, year, image та selected'
		)
	}

	req.validatedPost = payload
	next()
}

// === PATCH /api/posts/:id ===
export const validatePostPatchRequest = (req, res, next) => {
	const updates = {}

	if ('title' in req.body)
		updates.title =
			typeof req.body.title === 'string' ? req.body.title.trim() : req.body.title

	if ('description' in req.body)
		updates.description =
			typeof req.body.description === 'string'
				? req.body.description.trim()
				: req.body.description

	if ('category' in req.body)
		updates.category =
			typeof req.body.category === 'string'
				? req.body.category.trim()
				: req.body.category

	if ('tags' in req.body)
		updates.tags = Array.isArray(req.body.tags)
			? req.body.tags.map((t) => (typeof t === 'string' ? t.trim() : t))
			: req.body.tags

	if ('year' in req.body) updates.year = Number(req.body.year)
	if ('image' in req.body)
		updates.image =
			typeof req.body.image === 'string' ? req.body.image.trim() : req.body.image
	if ('selected' in req.body) updates.selected = Boolean(req.body.selected)

	if (!validatePatchPost(updates)) {
		return buildErrorResponse(res, 'Невірні дані посту: перевірте поля, що оновлюються')
	}

	req.validatedPostUpdates = updates
	next()
}
