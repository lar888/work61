import { cloneInitialUsers } from "../data/db_users.mjs"

// Внутрішній стан учасників команди (інMemory сторедж)
let users = cloneInitialUsers()

// ------------------------------
// CRUD-функції
// ------------------------------

// Функція для отримання учасника команди за ID
export const getUserById = (id) => {
	return users.find((user) => user.id === parseInt(id))
}

// Функція для отримання всіх учасників команди
export const getAllUsers = () => {
	return [...users]
}

// Функція для додавання нового учасника команди
export const addUser = (user) => {
	users.push(user)
	return user
}

// Функція для повної заміни учасника команди (PUT)
export const replaceUser = (id, newUserData) => {
	const index = users.findIndex((user) => user.id === parseInt(id))
	if (index !== -1) {
		users[index] = { ...newUserData, id: users[index].id }
		return users[index]
	}
	return null
}

// Функція для часткового оновлення учасника команди (PATCH)
export const patchUser = (id, partialUserData) => {
	const index = users.findIndex((user) => user.id === parseInt(id))
	if (index !== -1) {
		users[index] = { ...users[index], ...partialUserData }
		return users[index]
	}
	return null
}

// Функція для видалення учасника команди
export const deleteUser = (id) => {
	const index = users.findIndex((user) => user.id === parseInt(id))
	if (index !== -1) {
		return users.splice(index, 1)[0]
	}
	return null
}

// ------------------------------
// Допоміжні функції
// ------------------------------

// Функція для генерації наступного ID
export const getNextId = () => {
	return users.length > 0 ? Math.max(...users.map((p) => p.id)) + 1 : 1
}

// ------------------------------
// Валідація
// ------------------------------

// Функція для валідації учасника команди
export const validateUser = (user) => {
	if (!user) return false
	if (!Number.isInteger(user.id) || Number.isNaN(user.id)) return false
	if (typeof user.member !== 'string' || user.member.trim() === '') return false
	if (typeof user.description !== 'string' || user.description.trim() === '') return false
if (typeof user.image !== 'string' || user.image.trim() === '') return false
	return true
}

export const validatePatchUser = (updates) => {
	if (!updates || typeof updates !== 'object') return false

	if (
		updates.member === undefined &&
		updates.description === undefined &&
		updates.image === undefined
	) {
		return false
	}

	if (updates.member !== undefined) {
		if (typeof updates.member !== 'string' || updates.member.trim() === '') return false
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
export const validatePutUser = (user) => {
	if (!user) return false
	if (typeof user.member !== 'string' || user.member.trim() === '') return false
	if (typeof user.description !== 'string' || user.description.trim() === '') return false
	if (typeof user.image !== 'string' || user.image.trim() === '') return false
	return true
}
