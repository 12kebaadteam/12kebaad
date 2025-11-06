const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.stream) filter.stream = req.query.stream;
    if (req.query.level) filter.level = req.query.level;
    if (req.query.modality) filter.modality = req.query.modality;
    const items = await Course.find(filter).limit(1000);
    res.json(items);
  } catch (err) { res.status(500).json({ error: err.message }); }
});
router.post('/batch', async (req, res) => {
  try {
    const arr = req.body.courses || [];
    const inserted = await Course.insertMany(arr, { ordered: false });
    res.json({ success: true, count: inserted.length });
  } catch (err) { res.status(500).json({ error: err.message }); }
});
module.exports = router;
