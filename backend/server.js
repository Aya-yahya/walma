import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  //  app.get('/', (req, res) => {
  //   res.send('API is running')
  // })
}

const PORT = process.env.PORT || 5000
app.listen(
  5000,
  console.log(`server running on port ${process.env.PORT}`.yellow.bold)
)
