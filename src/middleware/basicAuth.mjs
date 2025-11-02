import dotenv from 'dotenv'
import { HTTP_STATUS } from '../config/http.mjs'
dotenv.config()

export function basicAuth(req, res, next) {
	// 🔹 Skip auth if disabled in .env
	if (process.env.ENABLE_BASIC_AUTH === 'false') {
		return next()
	}

	const authHeader = req.headers['authorization']

	if (!authHeader || !authHeader.startsWith('Basic ')) {
		return res.status(HTTP_STATUS.UNAUTHORIZED).json({
			success: false,
			error: 'Access denied. No credentials sent.'
		})
	}

	const base64Credentials = authHeader.split(' ')[1]
	const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8')
	const [username, password] = credentials.split(':')

	if (
		username === process.env.ADMIN_USER &&
		password === process.env.ADMIN_PASS
	) {
		return next()
	}

	return res.status(HTTP_STATUS.UNAUTHORIZED).json({
		success: false,
		error: 'Invalid credentials.'
	})
}
