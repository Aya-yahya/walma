import express from 'express'
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  payMyOrders,
  updateOrderToDelivered,
} from '../controllers/orderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(addOrderItems).get(protect, admin, getOrders)
router.route('/myorders').get(protect, getMyOrders)

router.route('/:id').get(getOrderById)
router.route('/:id/pay').put(updateOrderToPaid)
router.route('/payid').post(payMyOrders)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)

export default router
