import { Router } from 'express'
import {
	getOneResearchAPI, getResearchAPI,
	createResearchAPI,
	replaceResearchAPI,
	updateResearchAPI,
	deleteResearchAPI
} from '../../controllers/researchController.mjs'
import {
	validateResearchCreateRequest,
	validateResearchPutRequest,
	validateResearchPatchRequest
} from '../../middleware/researchValidation.mjs'

const router = Router()

// /research - колекція досліджень
router
	.route('/')
	.get(getResearchAPI) // GET /research - список досліджень
	.post(validateResearchCreateRequest, createResearchAPI) // POST /api/research - створити нове дослідження

// /api/research/:id
router
	.route('/:id')
	.get(getOneResearchAPI) // GET /api/research/:id - отримати дослідження за ID
	.put(validateResearchPutRequest, replaceResearchAPI) // PUT /api/research/:id - повне оновлення дослідження
	.patch(validateResearchPatchRequest, updateResearchAPI) // PATCH /api/research/:id - часткове оновлення дослідження
	.delete(deleteResearchAPI) // DELETE /api/research/:id - видалити дослідження


export default router