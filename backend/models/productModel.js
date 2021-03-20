import mongoose from 'mongoose'
import mongooseIntl from 'mongoose-intl'
import User from '../models/userModel.js'

mongoose.plugin(mongooseIntl, {
  languages: ['en', 'ar'],
  defaultLanguage: 'en',
})

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
      intl: true,
    },
    image: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      intl: true,
    },
    description: {
      type: String,
      required: true,
      intl: true,
    },

    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
)
const Product = mongoose.model('Product', productSchema)

export default Product
