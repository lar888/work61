import { cloneInitialPosts } from "../data/db_posts.mjs"
import { cloneInitialCategories } from '../data/db_categories.mjs'
import { cloneInitialTags } from '../data/db_tags.mjs'
import { cloneInitialPostTags } from '../data/db_postTags.mjs'
import { slugify } from "../utils/slugify.mjs"

// In-memory posts storage
let posts = cloneInitialPosts()
export let categories = cloneInitialCategories()
export let tags = cloneInitialTags()
export let postTags = cloneInitialPostTags()

// ------------------------------
// Helpers
// ------------------------------
export const getNextId = () => {
	return posts.length > 0 ? Math.max(...posts.map((p) => p.id)) + 1 : 1
}

export const findCategoryIdByTitle = (title) => {
	const found = categories.find(c => c.title.toLowerCase() === title.toLowerCase())
	return found?.id || null
}

export const findTagIdByTitle = (title) => {
	const found = tags.find(t => t.title.toLowerCase() === title.toLowerCase())
	return found?.id || null
}

const formatPostResponse = (post) => {
	const category = categories.find(c => c.id === post.category_id)?.title || null

	const tagIds = postTags
		.filter(pt => pt.post_id === post.id)
		.map(pt => pt.tag_id)

	const tagNames = tags
		.filter(t => tagIds.includes(t.id))
		.map(t => t.title)

	return {
		id: post.id,
		title: post.title,
		description: post.description,
		category,
		tags: tagNames,
		year: post.year,
		image: post.image,
		selected: post.selected
	}
}

// ------------------------------
// CRUD
// ------------------------------
export const getPostById = (id) => {
	return posts.find((post) => post.id === parseInt(id))
}

export const getAllPosts = () => {
	return [...posts]
}

export const addPost = (post) => {
	const id = getNextId()
	const alias = slugify(post.title)

	const category_id = findCategoryIdByTitle(post.category)
	if (!category_id) throw new Error(`Unknown category: ${post.category}`)

	const newPost = {
		id,
		title: post.title,
		alias,
		description: post.description,
		category_id,
		year: post.year,
		image: post.image,
		selected: post.selected ?? false
	}

	posts.push(newPost)

	post.tags.forEach(tagName => {
		const tag_id = findTagIdByTitle(tagName)
		if (!tag_id) throw new Error(`Unknown tag: ${tagName}`)
		postTags.push({ post_id: id, tag_id })
	})

	return formatPostResponse(newPost)
}

export const replacePost = (id, newPostData) => {
	const index = posts.findIndex((post) => post.id === parseInt(id))
	if (index === -1) return null

	// Find new category id
	const category_id = findCategoryIdByTitle(newPostData.category)
	if (!category_id) throw new Error(`Unknown category: ${newPostData.category}`)

	// Replace post
	const updatedPost = {
		id: posts[index].id,
		title: newPostData.title,
		alias: slugify(newPostData.title),
		description: newPostData.description,
		category_id,
		year: newPostData.year,
		image: newPostData.image,
		selected: newPostData.selected ?? false,
	}

	posts[index] = updatedPost

	// Update tags
	// Remove old tags
	postTags = postTags.filter(pt => pt.post_id !== updatedPost.id)

	// Add new tags
	newPostData.tags.forEach(tagName => {
		const tag_id = findTagIdByTitle(tagName)
		if (!tag_id) throw new Error(`Unknown tag: ${tagName}`)
		postTags.push({ post_id: updatedPost.id, tag_id })
	})

	return formatPostResponse(updatedPost)
}

export const patchPost = (id, partialPostData) => {
	const index = posts.findIndex(post => post.id === parseInt(id))
	if (index === -1) return null

	// Update category if provided
	if (partialPostData.category) {
		const category_id = findCategoryIdByTitle(partialPostData.category)
		if (!category_id) throw new Error(`Unknown category: ${partialPostData.category}`)
		partialPostData.category_id = category_id
		delete partialPostData.category
	}

	// Update main post fields
	posts[index] = { ...posts[index], ...partialPostData }

	// Update tags if provided
	if (partialPostData.tags) {
		// Remove old tags
		postTags = postTags.filter(pt => pt.post_id !== posts[index].id)

		// Add new tags
		partialPostData.tags.forEach(tagName => {
			const tag_id = findTagIdByTitle(tagName)
			if (!tag_id) throw new Error(`Unknown tag: ${tagName}`)
			postTags.push({ post_id: posts[index].id, tag_id })
		})
	}

	// Recreate alias if title was updated
	if (partialPostData.title) {
		posts[index].alias = slugify(posts[index].title)
	}

	return posts[index];
}

export const deletePost = (id) => {
	const postId = parseInt(id);
	const index = posts.findIndex((post) => post.id === postId)

	if (index === -1) return null

	// Remove post
	const deletedPost = posts.splice(index, 1)[0]

	// Remove associated tags
	postTags = postTags.filter(pt => pt.post_id !== postId)

	return deletedPost
}

// ------------------------------
// Validation
// ------------------------------

export const validatePatchPost = (updates) => {
	if (!updates || typeof updates !== 'object') return false
	if (
		updates.title === undefined &&
		updates.description === undefined &&
		updates.category === undefined &&
		updates.tags === undefined &&
		updates.year === undefined &&
		updates.image === undefined &&
		updates.selected === undefined
	) {
		return false
	}
	if (updates.title !== undefined && (typeof updates.title !== 'string' || updates.title.trim() === '')) return false
	if (updates.description !== undefined && (typeof updates.description !== 'string' || updates.description.trim() === '')) return false
	if (updates.category !== undefined && (typeof updates.category !== 'string' || updates.category.trim() === '')) return false
	if (updates.tags !== undefined) {
		if (
			!Array.isArray(updates.tags) ||
			updates.tags.length === 0 ||
			!updates.tags.every((tag) => typeof tag === 'string' && tag.trim() !== '')
		) return false
	}
	if (updates.year !== undefined && (!Number.isInteger(updates.year) || updates.year < 2015)) return false
	if (updates.image !== undefined && (typeof updates.image !== 'string' || updates.image.trim() === '')) return false
	if (updates.selected !== undefined && typeof updates.selected !== 'boolean') return false
	return true
}

export const validatePutPost = (post) => {
	if (!post) return false
	if (typeof post.title !== 'string' || post.title.trim() === '') return false
	if (typeof post.description !== 'string' || post.description.trim() === '') return false
	if (typeof post.category !== 'string' || post.category.trim() === '') return false
	if (
		!Array.isArray(post.tags) ||
		post.tags.length === 0 ||
		!post.tags.every((tag) => typeof tag === 'string' && tag.trim() !== '')
	) return false
	if (!Number.isInteger(post.year) || post.year <= 0) return false
	if (typeof post.image !== 'string' || post.image.trim() === '') return false
	if (typeof post.selected !== 'boolean') return false
	return true
}
