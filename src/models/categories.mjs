import { cloneInitialCategories } from "../data/db_categories.mjs"
import { slugify } from "../utils/slugify.mjs"

// In-memory categories storage
let categories = cloneInitialCategories()

// ------------------------------
// Helpers
// ------------------------------
export const getNextId = () => {
	return categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1
}

// ------------------------------
// CRUD
// ------------------------------
export const getCategoryById = (id) => {
	return categories.find(c => c.id === parseInt(id))
}

export const getAllCategories = () => {
	return [...categories]
}

export const addCategory = (category) => {
	const newCategory = {
		...category,
		alias: slugify(category.alias || category.title)
	}

	categories.push(newCategory)
	return newCategory
}

export const replaceCategory = (id, newCategoryData) => {
	const index = categories.findIndex(c => c.id === parseInt(id))
	
	if (index !== -1) {
		const updatedCategory = {
			...categories[index],
			...newCategoryData,
			alias: slugify(newCategoryData.alias || newCategoryData.title)
		}
		categories[index] = updatedCategory
		return updatedCategory
	}
	return null
}

export const deleteCategory = (id) => {
	const index = categories.findIndex(c => c.id === parseInt(id))
	if (index !== -1) {
		return categories.splice(index, 1)[0]
	}
	return null
}

// ------------------------------
// Validation
// ------------------------------

export const validatePutCategory = (category) => {
	if (!category) return false
	if (typeof category.title !== "string" || category.title.trim() === "") return false
	return true
}
