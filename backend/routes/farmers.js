const express = require('express');
const bcrypt = require('bcryptjs');
const Farmer = require('../models/Farmer');

const router = express.Router();

// New Farmer Registration
router.post('/register', async (req, res) => {
  try {
    const { name, mobileNumber, address, password } = req.body;

    // Check if farmer already exists
    const existingFarmer = await Farmer.findOne({ mobileNumber });
    if (existingFarmer) {
      return res.status(400).json({ error: 'Farmer with this mobile number already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new farmer
    const farmer = new Farmer({
      name,
      mobileNumber,
      address,
      password: hashedPassword
    });

    await farmer.save();
    res.status(201).json({ message: 'Farmer registered successfully', farmerId: farmer._id });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed', message: error.message });
  }
});

// Get farmers by address for login
router.get('/by-address/:address', async (req, res) => {
  try {
    const { address } = req.params;
    const farmers = await Farmer.find({ address: new RegExp(address, 'i') })
      .select('name mobileNumber')
      .sort({ name: 1 });
    
    res.json(farmers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch farmers', message: error.message });
  }
});

// Farmer Login
router.post('/login', async (req, res) => {
  try {
    const { mobileNumber, name, password } = req.body;

    // Find farmer
    const farmer = await Farmer.findOne({ mobileNumber, name });
    if (!farmer) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, farmer.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    res.json({ 
      message: 'Login successful', 
      farmerId: farmer._id,
      farmerName: farmer.name 
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed', message: error.message });
  }
});

module.exports = router;