import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import Product from '../models/productModel.js'
import generateToken from '../utils/generateToken.js'

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email: email }).populate('wishlist')
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      wishlist: user.wishlist,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('invalid email or password')
  }
})

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    const userInfo = user.select('-password').populate('wishlist')
    res.json(userInfo)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }
    await user.save()
    const updatedUser = await User.findById(user._id).populate('wishlist')
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      wishlist: updatedUser.wishlist,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('user not found')
  }
})

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email: email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({ name, email, password })

  const updatedUser = await User.findById(user._id).populate('wishlist')

  if (user) {
    res.status(201).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      wishlist: updatedUser.wishlist,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(400)
    throw new Error('invalid user data')
  }
})

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find()
  res.json(users)
})

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id) // remember that params.id comes from the url, not straight from the model
  if (user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
    .select('-password')
    .populate('wishlist') // remember that params.id comes from the url, not straight from the model
  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email

    user.isAdmin = user.isAdmin

    await user.save()
    const updatedUser = await User.findById(user._id).populate('wishlist')

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      wishlist: updatedUser.wishlist,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

const addToWishList = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  let alreadyAdded
  if (user) {
    if (user.wishlist.length > 0) {
      alreadyAdded = user.wishlist.find(
        (product) => product._id.toString() === req.params.id.toString()
      )
    } else {
      alreadyAdded = false
    }
    if (alreadyAdded) {
      var filtered = user.wishlist.filter(
        (product) => product._id.toString() !== req.params.id.toString()
      )
      user.wishlist = filtered

      await user.save()

      const userupdated = await User.findById(user._id).populate('wishlist')

      res.status(201).json({
        _id: userupdated._id,
        name: userupdated.name,
        email: userupdated.email,
        isAdmin: userupdated.isAdmin,
        wishlist: userupdated.wishlist,
        token: generateToken(userupdated._id),
      })
    } else {
      user.wishlist.push(req.params.id)

      await user.save()

      const userupdated = await User.findById(user._id).populate('wishlist')

      res.status(201).json({
        _id: userupdated._id,
        name: userupdated.name,
        email: userupdated.email,
        isAdmin: userupdated.isAdmin,
        wishlist: userupdated.wishlist,
        token: generateToken(userupdated._id),
      })
    }
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export {
  authUser,
  getUserProfile,
  getUsers,
  registerUser,
  updateUserProfile,
  deleteUser,
  getUserById,
  updateUser,
  addToWishList,
}
