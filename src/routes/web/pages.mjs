import { getHomePage } from '../../controllers/pageController.mjs'
import { Router } from "express"

export const router = Router()

// Головна сторінка
router.route('/').get(getHomePage)

export default router