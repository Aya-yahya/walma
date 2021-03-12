import express from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'
const router = express.Router()

import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  addToWishList,
} from '../controllers/userControllers.js'

router.post('/login', authUser)

router.route('/').post(registerUser).get(protect, admin, getUsers)
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
router.route('/product/:id').put(protect, addToWishList)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

export default router
