import mongoose from 'mongoose'
import dotenv from 'dotenv'
import mongooseIntl from 'mongoose-intl'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import cities from './data/cities.js'
import City from './models/city.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()
mongoose.plugin(mongooseIntl, {
  languages: ['en', 'ar'],
  defaultLanguage: 'en',
})

const importData = async () => {
  try {
    await Order.deleteMany()
    await City.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)
    const adminUser = createdUsers[0]._id

    const sampleProducts = products.map((product) => {
      return {
        ...product,

        user: adminUser,
      }
    })
    await Product.insertMany(sampleProducts)

    const createCities = await City.insertMany(cities)

    console.log('data imported'.green)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await City.deleteMany()
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('data destroyed'.red)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
