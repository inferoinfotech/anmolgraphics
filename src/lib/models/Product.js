import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  images: [{
    type: String,
  }],
  thumbnail: {
    type: String,
    default: '/placeholder.svg',
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  hashtags: [{
    type: String,
  }],
  highlights: [{
    type: String,
  }],
  price: {
    type: String,
    default: '',
  },
  rating: {
    type: Number,
    default: 5,
    min: 1,
    max: 5,
  },
  note: {
    type: String,
    default: 'Prices may vary based on purchase quantity and any customizations. An 18% GST charge will apply.',
  },
  sections: [{
    content: {
      type: String,
      default: '',
    }
  }],
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
