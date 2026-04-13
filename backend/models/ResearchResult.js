const mongoose = require('mongoose');

const researchResultSchema = new mongoose.Schema({
  farmingRecordId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FarmingRecord',
    required: true
  },
  farmerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farmer',
    required: true
  },
  bestCrop: {
    name: String,
    description: String
  },
  irrigationProcess: {
    steps: [String],
    duration: String
  },
  profitCategory: {
    type: String,
    enum: ['High', 'Medium', 'Low']
  },
  riskAnalysis: {
    level: {
      type: String,
      enum: ['Low', 'Medium', 'High']
    },
    factors: [String]
  },
  weatherSuitability: {
    current: String,
    forecast: String,
    recommendation: String
  },
  scrapedData: mongoose.Schema.Types.Mixed,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ResearchResult', researchResultSchema);