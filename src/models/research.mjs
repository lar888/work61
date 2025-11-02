import { cloneInitialResearch } from "../data/db_research.mjs"

// Внутрішній стан досліджень (інMemory сторедж)
let research = cloneInitialResearch()

// ------------------------------
// CRUD-функції
// ------------------------------

// Функція для отримання дослідження за ID
export const getResearchById = (id) => {
	return research.find((item) => item.id === parseInt(id))
}

// Функція для отримання всіх досліджень
export const getAllResearch = () => {
	return [...research]
}

// Функція для додавання нового дослідження
export const addResearch = (item) => {
	research.push(item)
	return item
}

// Функція для повної заміни дослідження (PUT)
export const replaceResearch = (id, newResearchData) => {
	const index = research.findIndex((item) => item.id === parseInt(id))
	if (index !== -1) {
		research[index] = { ...newResearchData, id: research[index].id }
		return research[index]
	}
	return null
}

// Функція для часткового оновлення дослідження (PATCH)
export const patchResearch = (id, partialResearchData) => {
	const index = research.findIndex((item) => item.id === parseInt(id))
	if (index !== -1) {
		research[index] = { ...research[index], ...partialResearchData }
		return research[index]
	}
	return null
}

// Функція для видалення дослідження
export const deleteResearch = (id) => {
	const index = research.findIndex((item) => item.id === parseInt(id))
	if (index !== -1) {
		return research.splice(index, 1)[0]
	}
	return null
}

// ------------------------------
// Допоміжні функції
// ------------------------------

// Функція для генерації наступного ID
export const getNextId = () => {
	return research.length > 0 ? Math.max(...research.map((p) => p.id)) + 1 : 1
}

// ------------------------------
// Валідація
// ------------------------------

// Функція для валідації дослідження
export const validateResearch = (item) => {
	if (!item) return false
	if (!Number.isInteger(item.id) || Number.isNaN(item.id)) return false
	if (typeof item.title !== 'string' || item.title.trim() === '') return false
	if (typeof item.description !== 'string' || item.description.trim() === '') return false
	if (typeof item.image !== 'string' || item.image.trim() === '') return false
	return true
}

export const validatePatchResearch = (updates) => {
	if (!updates || typeof updates !== 'object') return false

	if (
		updates.title === undefined &&
		updates.description === undefined &&
		updates.image === undefined
	) {
		return false
	}

	if (updates.title !== undefined) {
		if (typeof updates.title !== 'string' || updates.title.trim() === '') return false
	}

	if (updates.description !== undefined) {
		if (typeof updates.description !== 'string' || updates.description.trim() === '') return false
	}

	if (updates.image !== undefined) {
		if (typeof updates.image !== 'string' || updates.image.trim() === '') return false
	}

	return true
}

// Функція для валідації PUT оновлень (повна заміна)
export const validatePutResearch = (item) => {
	if (!item) return false
	if (typeof item.title !== 'string' || item.title.trim() === '') return false
	if (typeof item.description !== 'string' || item.description.trim() === '') return false
	if (typeof item.image !== 'string' || item.image.trim() === '') return false
	return true
}
