const express = require('express');
const FarmingRecord = require('../models/FarmingRecord');
const ResearchResult = require('../models/ResearchResult');

const router = express.Router();

// Create new farming record (limit 3 per farmer)
router.post('/', async (req, res) => {
  try {
    const { farmerId, farmingType, soilType, waterAvailability, area, fertilityPercentage } = req.body;

    // Check if farmer already has 3 records
    const recordCount = await FarmingRecord.countDocuments({ farmerId });
    if (recordCount >= 3) {
      return res.status(400).json({ 
        error: 'Maximum 3 farming records allowed per farmer' 
      });
    }

    const farmingRecord = new FarmingRecord({
      farmerId,
      farmingType,
      soilType,
      waterAvailability,
      area,
      fertilityPercentage
    });

    await farmingRecord.save();
    res.status(201).json({ 
      message: 'Farming record created successfully', 
      recordId: farmingRecord._id 
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create farming record', message: error.message });
  }
});

// Get all farming records for a farmer
router.get('/farmer/:farmerId', async (req, res) => {
  try {
    const { farmerId } = req.params;
    const records = await FarmingRecord.find({ farmerId })
      .sort({ createdAt: -1 });
    
    // Populate with research results if available
    const recordsWithResults = await Promise.all(records.map(async (record) => {
      const result = await ResearchResult.findOne({ farmingRecordId: record._id });
      return {
        ...record.toObject(),
        hasResearchResult: !!result,
        researchResultId: result?._id
      };
    }));

    res.json(recordsWithResults);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch farming records', message: error.message });
  }
});

// Update farming record
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    updates.updatedAt = Date.now();

    const record = await FarmingRecord.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );

    if (!record) {
      return res.status(404).json({ error: 'Farming record not found' });
    }

    res.json({ message: 'Farming record updated successfully', record });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update farming record', message: error.message });
  }
});

// Delete farming record
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Delete associated research results first
    await ResearchResult.deleteMany({ farmingRecordId: id });
    
    // Delete farming record
    const record = await FarmingRecord.findByIdAndDelete(id);
    
    if (!record) {
      return res.status(404).json({ error: 'Farming record not found' });
    }

    res.json({ message: 'Farming record deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete farming record', message: error.message });
  }
});

module.exports = router;