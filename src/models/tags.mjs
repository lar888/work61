import { cloneInitialTags } from "../data/db_tags.mjs"
import { slugify } from "../utils/slugify.mjs"

// In-memory tags storage
let tags = cloneInitialTags()

// ------------------------------
// Helpers
// ------------------------------
export const getNextId = () => {
	return tags.length > 0 ? Math.max(...tags.map(t => t.id)) + 1 : 1
}

// ------------------------------
// CRUD
// ------------------------------
export const getTagById = (id) => {
	return tags.find(t => t.id === parseInt(id))
}

export const getAllTags = () => {
	return [...tags]
}

export const addTag = (tag) => {
	const newTag = {
		...tag,
		alias: slugify(tag.alias || tag.title)
	}

	tags.push(newTag)
	return newTag
}

export const replaceTag = (id, newTagData) => {
	const index = tags.findIndex(t => t.id === parseInt(id))

	if (index === -1) return null

	const updatedTag = {
		...tags[index],
		...newTagData,
		alias: slugify(newTagData.alias || newTagData.title)
	}

	tags[index] = updatedTag
	return updatedTag
}

export const patchTag = (id, partialTagData) => {
	const index = tags.findIndex(t => t.id === parseInt(id))
	if (index !== -1) {
		tags[index] = { ...tags[index], ...partialTagData }
		return tags[index]
	}
	return null
}

export const deleteTag = (id) => {
	const index = tags.findIndex(t => t.id === parseInt(id))
	if (index !== -1) {
		return tags.splice(index, 1)[0]
	}
	return null
}

// ------------------------------
// Validation
// ------------------------------

export const validatePatchTag = (updates) => {
	if (!updates || typeof updates !== 'object') return false
	if (updates.title === undefined) return false
	if (updates.title !== undefined) {
		if (typeof updates.title !== 'string' || updates.title.trim() === '') return false
	}
	return true
}

export const validatePutTag = (tag) => {
	if (!tag) return false
	if (typeof tag.title !== "string" || tag.title.trim() === "") return false
	return true
}
