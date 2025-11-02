import { Router } from 'express'

import postsRouter from './posts.mjs'
import newsRouter from './news.mjs'
import researchRouter from './research.mjs'
import usersRouter from './users.mjs'
import categoriesRouter from './categories.mjs'
import tagsRouter from './tags.mjs'

import { HTTP_STATUS } from '../../config/http.mjs'

const api = Router()

// API routes
api.use('/posts', postsRouter)
api.use('/news', newsRouter)
api.use('/research', researchRouter)
api.use('/users', usersRouter)
api.use('/categories', categoriesRouter)
api.use('/tags', tagsRouter)

// Middleware для 404 у API (JSON відповідь)
api.use((req, res) => {
	res.status(HTTP_STATUS.NOT_FOUND).json({
		success: false,
		error: 'API endpoint not found',
		path: req.originalUrl
	})
})

export default api
