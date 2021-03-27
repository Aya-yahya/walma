import mongoose from 'mongoose'
import mongooseIntl from 'mongoose-intl'

mongoose.plugin(mongooseIntl, {
  languages: ['en', 'ar'],
  defaultLanguage: 'en',
})

const citySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    intl: true,
  },
  code: { type: Number, required: true },
  places: [
    {
      en: { type: String },
      ar: { type: String },
    },
  ],
})

const City = mongoose.model('City', citySchema)

export default City
