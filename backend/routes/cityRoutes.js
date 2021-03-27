import express from 'express'
import { getCityByName } from '../controllers/cityController.js'

const router = express.Router()

router.route('/:code').get(getCityByName)

export default router
