import PromoCode from '../models/promoCode.js'
import asyncHandler from 'express-async-handler'

const getCode = asyncHandler(async (req, res) => {
  const code = req.params.code
  const promoCode = await PromoCode.findOne({ code: code })
  res.json(promoCode)
})
const getCodesList = asyncHandler(async (req, res) => {
  const codes = await PromoCode.find()
  res.json(codes)
})

const deleteCode = asyncHandler(async (req, res) => {
  const code = await PromoCode.findById(req.params.code)
  // req.params.id gets its value from the url

  if (code) {
    await code.remove()
    res.json({ message: 'promoCODE removed' })
  } else {
    res.status(404)
    throw new Error('promoCode not found')
  }
})

const createCode = asyncHandler(async (req, res) => {
  const code = new PromoCode({
    user: req.user._id,
    code: req.body.code,
    discount: req.body.discount,
  })

  await code.save()

  if (code) {
    res.status(201).json('created code')
  } else {
    res.status(400)
    throw new Error('invalid user data')
  }
})

export { getCode, deleteCode, createCode, getCodesList }
