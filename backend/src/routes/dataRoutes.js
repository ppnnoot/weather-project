const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const DataModel = require('../models/dataModel');

// Middleware Check Token
router.use(authenticateToken);

// Route ดึงข้อมูลทั้งหมด
router.get('/alldata', async (req, res) => {
  try {
    const allData = await DataModel.find();
    res.json(allData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
    