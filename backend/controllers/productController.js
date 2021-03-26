import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

const getProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          en: { $regex: req.query.keyword, $options: 'i' },
          ar: { $regex: req.query.keyword, $options: 'i' },
        },
      }
    : {} //req.query is how you get query strings, aka anything after the ? in the URL
  //using $regex lets it search up partially correct terms and $options: 'i' makes it case insensitive

  const products1 = await Product.find({
    'name.en': { $regex: req.query.keyword, $options: 'i' },
  })
  const products2 = await Product.find({
    'name.ar': { $regex: req.query.keyword, $options: 'i' },
  })

  res.json(products1.concat(products2))
})

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})

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
    name: { en: req.body.englishName, ar: req.body.arabicName },
    price: req.body.price,
    sale: {
      status: req.body.onSale,
      discount: req.body.discount,
      qty: req.body.saleQty,
      lastDay: req.body.lastDate,
    },
    user: req.user._id,
    image: req.body.image,
    countInStock: req.body.countInStock,
    description: { en: req.body.descriptionEN, ar: req.body.descriptionAR },
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

const updateProduct = asyncHandler(async (req, res) => {
  const {
    arabicName,
    englishName,
    price,
    onSale,
    discount,
    lastDate,
    saleQty,
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
    product.sale = {
      status: req.body.onSale,
      discount: req.body.discount,
      qty: req.body.saleQty,
      lastDay: req.body.lastDate,
    }

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
  getAllProducts,
}
