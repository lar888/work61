import { cloneInitialNews } from "../data/db_news.mjs"
import { isReadableDateFormat } from "../utils/functions.mjs"

// Внутрішній стан новин (in-memory сторедж)
let news = cloneInitialNews()

// ------------------------------
// CRUD-функції
// ------------------------------

// Отримати всі новини
export const getAllNews = () => {
	return [...news]
}

// Отримати новину за ID
export const getNewsById = (id) => {
	return news.find((item) => item.id === parseInt(id))
}

// Додати нову новину
export const addNews = (item) => {
	news.push(item)
	return item
}

// Повна заміна (PUT)
export const replaceNews = (id, newNewsData) => {
	const index = news.findIndex((item) => item.id === parseInt(id))
	if (index !== -1) {
		news[index] = { ...newNewsData, id: news[index].id }
		return news[index]
	}
	return null
}

// Часткове оновлення (PATCH)
export const patchNews = (id, partialNewsData) => {
	const index = news.findIndex((item) => item.id === parseInt(id))
	if (index !== -1) {
		news[index] = { ...news[index], ...partialNewsData }
		return news[index]
	}
	return null
}

// Видалення новини
export const deleteNews = (id) => {
	const index = news.findIndex((item) => item.id === parseInt(id))
	if (index !== -1) {
		return news.splice(index, 1)[0]
	}
	return null
}

// ------------------------------
// Допоміжні функції
// ------------------------------

// Згенерувати наступний ID
export const getNextId = () => {
	return news.length > 0 ? Math.max(...news.map((n) => n.id)) + 1 : 1
}

// ------------------------------
// Валідація
// ------------------------------

// Повна валідація новини (для POST / PUT)
export const validateNews = (item) => {
	if (!item) return false
	if (!Number.isInteger(item.id) || Number.isNaN(item.id)) return false
	if (typeof item.image !== "string" || item.image.trim() === "") return false
	// date — обов’язковий рядок типу "5 January 2025"
	if (typeof item.date !== "string" || !isReadableDateFormat(item.date)) return false
	if (typeof item.description !== "string" || item.description.trim() === "") return false
	return true
}

// Часткова валідація новини (для PATCH)
export const validatePatchNews = (updates) => {
	if (!updates || typeof updates !== "object") return false

	if (
		updates.image === undefined &&
		updates.date === undefined &&
		updates.description === undefined
	) {
		return false
	}

	if (updates.image !== undefined) {
		if (typeof updates.image !== "string" || updates.image.trim() === "") return false
	}

	if (updates.date !== undefined) {
		if (typeof updates.date !== "string" || !isReadableDateFormat(updates.date)) return false
	}

	if (updates.description !== undefined) {
		if (typeof updates.description !== "string" || updates.description.trim() === "") return false
	}

	return true
}

// Функція для валідації PUT оновлень (повна заміна)
export const validatePutNews = (item) => {
	if (!item) return false
	// id — optional for creation (can be auto-assigned later)
	if (item.id !== undefined && (!Number.isInteger(item.id) || Number.isNaN(item.id))) return false
	if (typeof item.image !== "string" || item.image.trim() === "") return false
	if (typeof item.date !== "string" || item.date.trim() === "") return false
	if (typeof item.description !== "string" || item.description.trim() === "") return false
	return true
}
