const mongoose = require('mongoose');

const farmingRecordSchema = new mongoose.Schema({
  farmerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farmer',
    required: true
  },
  farmingType: {
    type: String,
    enum: ['Indoor', 'Outdoor'],
    required: true
  },
  soilType: {
    type: String,
    required: true
  },
  waterAvailability: {
    hasWater: {
      type: Boolean,
      required: true
    },
    percentage: {
      type: Number,
      min: 0,
      max: 100
    }
  },
  area: {
    type: Number,
    required: true
  },
  fertilityPercentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index to limit 3 records per farmer
farmingRecordSchema.index({ farmerId: 1 });

module.exports = mongoose.model('FarmingRecord', farmingRecordSchema);