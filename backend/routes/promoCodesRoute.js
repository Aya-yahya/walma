import express from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'
const router = express.Router()

import {
  getCode,
  deleteCode,
  createCode,
  getCodesList,
} from '../controllers/promocodeController.js'

router.route('/:code').get(getCode).delete(protect, admin, deleteCode)
router.route('/').get(getCodesList).post(protect, admin, createCode)

export default router
