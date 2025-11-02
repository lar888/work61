import { Router } from "express"
import pagesRouter from './pages.mjs'

const web = Router()

// Підключення роутерів
web.use('/', pagesRouter) // Головна сторінка та загальні маршрути

export default web