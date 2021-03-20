import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: 'i' } }
    : {} //req.query is how you get query strings, aka anything after the ? in the URL
  //using $regex lets it search up partially correct terms and $options: 'i' makes it case insensitive

  const count = await Product.countDocuments({ ...keyword })

  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1)) //10 products per page
  console.log(products)
  //  res.json({ products, page, pages: Math.ceil(count / pageSize) })
  res.json(products)
})

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('product not found')
  }
})

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  // req.params.id gets its value from the url

  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: { en: 'sample name', ar: 'sample name' },
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    countInStock: 0,
    description: { en: 'sample description', ar: 'sample description' },
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

const updateProduct = asyncHandler(async (req, res) => {
  const {
    arabicName,
    englishName,
    price,
    description,
    image,
    descriptionAR,
    descriptionEN,

    countInStock,
  } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = { en: englishName, ar: arabicName }
    product.price = price
    product.description = { en: descriptionEN, ar: descriptionAR }
    product.image = image

    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
}
