import mongoose from 'mongoose'
import mongooseIntl from 'mongoose-intl'

mongoose.plugin(mongooseIntl, {
  languages: ['en', 'ar'],
  defaultLanguage: 'en',
})

const promoCodeSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    code: { type: String, required: true },
    discount: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
)
const PromoCode = mongoose.model('PromoCode', promoCodeSchema)

export default PromoCode
