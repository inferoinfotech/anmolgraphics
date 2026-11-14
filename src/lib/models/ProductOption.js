import mongoose from 'mongoose';

const TYPES = ['material', 'orderType'];

const ProductOptionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: TYPES,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

ProductOptionSchema.index({ type: 1, name: 1 }, { unique: true });

export const PRODUCT_OPTION_TYPES = TYPES;

export default mongoose.models.ProductOption ||
  mongoose.model('ProductOption', ProductOptionSchema);