import asyncHandler from 'express-async-handler'
import City from '../models/city.js'

const getCityByName = asyncHandler(async (req, res) => {
  const city = await City.findOne({
    code: req.params.code,
  })
  res.json(city)
})

export { getCityByName }
