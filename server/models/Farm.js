import mongoose from 'mongoose';

const farmSchema = new mongoose.Schema({
  farmerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  cropType: {
    type: String,
    required: true,
    enum: ['Organic Vegetables', 'Apples', 'Heritage Grains', 'Organic Berries', 'Free-Range Eggs', 'Other']
  },
  location: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  fundingGoal: {
    type: Number,
    required: true,
    min: 1
  },
  currentFunding: {
    type: Number,
    default: 0,
    min: 0
  },
  tokenPrice: {
    type: Number,
    required: true,
    min: 1
  },
  totalTokens: {
    type: Number,
    required: true,
    min: 1
  },
  availableTokens: {
    type: Number,
    required: true,
    min: 0
  },
  harvestDate: {
    type: Date,
    required: true
  },
  plantingDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'funded', 'harvested', 'completed'],
    default: 'active'
  }
}, {
  timestamps: true
});

// Virtual for farmer details
farmSchema.virtual('farmer', {
  ref: 'User',
  localField: 'farmerId',
  foreignField: '_id',
  justOne: true
});

// Ensure virtual fields are serialized
farmSchema.set('toJSON', { virtuals: true });

export default mongoose.model('Farm', farmSchema);