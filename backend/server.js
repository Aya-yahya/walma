import dotenv from 'dotenv'
import morgan from 'morgan'
import express from 'express'
import uploadRoutes from './routes/uploadRoutes.js'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import mongoose from 'mongoose'
import mongooseIntl from 'mongoose-intl'
import path from 'path'
import productRoutes from './routes/productRoute.js'
import colors from 'colors'
import userRoutes from './routes/userRoutes.js'
import promocodeRoute from './routes/promoCodesRoute.js'
import orderRoutes from './routes/orderRoutes.js'

dotenv.config()
connectDB()
const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')) // only set for development mode
}

app.use(express.json())

app.use((req, res, next) => {
  next()
})
mongoose.plugin(mongooseIntl, {
  languages: ['en', 'ar'],
  defaultLanguage: 'en',
})
app.use('/api/products', productRoutes)
app.use('/api/promocodes', promocodeRoute)
app.use('/api/upload', uploadRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads'))) //this makes the uploads folder static. important for images.
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running')
  })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(
  PORT,
  console.log(`server running on port ${process.env.PORT}`.yellow.bold)
)
