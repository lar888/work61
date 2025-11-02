import { HTTP_STATUS } from "../config/http.mjs"

/**
 * Build a standard error response
 */
export const buildErrorResponse = (res, message) => {
	return res.status(HTTP_STATUS.BAD_REQUEST).json({
		success: false,
		error: message
	})
}

/**
 * Converts ISO ("2025-01-05") or readable ("5 January 2025") date
 * into standardized readable format. Returns formatted date or false if invalid.
 */
export const isReadableDateFormat = (dateStr) => {
	if (!dateStr || typeof dateStr !== "string") return false

	const trimmed = dateStr.trim()

	// Already correct format
	const readableDateRegex = /^\d{1,2}\s+[A-Za-z]+\s+\d{4}$/
	if (readableDateRegex.test(trimmed)) return trimmed

	// ISO format ("YYYY-MM-DD")
	const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/
	if (isoDateRegex.test(trimmed)) {
		const date = new Date(trimmed)
		if (isNaN(date.getTime())) return false
		const day = date.getUTCDate()
		const month = date.toLocaleString("en-GB", { month: "long", timeZone: "UTC" })
		const year = date.getUTCFullYear()
		return `${day} ${month} ${year}`
	}

	return false
}

/**
 * Validate and normalize date from request.
 * - Accepts ISO ("2025-01-05") or readable ("5 January 2025")
 * - Returns formatted date ("5 January 2025") or sends error response
 */
export const validateAndFormatDate = (req, res) => {
	const formattedDate = isReadableDateFormat(req.body.date?.trim?.())
	if (!formattedDate) {
		return buildErrorResponse(
			res,
			'Невірний формат дати (очікується "5 January 2025" або ISO "2025-01-05")'
		)
	}
	return formattedDate
}
