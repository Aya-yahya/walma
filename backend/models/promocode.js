import mongoose from 'mongoose'

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
