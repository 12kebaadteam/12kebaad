const express = require('express');
const router = express.Router();
const Institution = require('../models/Institution');
router.get('/', async (req, res) => {
  try {
    const { state, courseId, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (state) filter.state = state;
    if (courseId) filter.coursesOffered = courseId;
    const skip = (page-1) * limit;
    const total = await Institution.countDocuments(filter);
    const items = await Institution.find(filter).skip(Number(skip)).limit(Number(limit)).populate('coursesOffered');
    res.json({ total, page: Number(page), limit: Number(limit), items });
  } catch (err) { res.status(500).json({ error: err.message }); }
});
router.post('/batch', async (req, res) => {
  try {
    const arr = req.body.institutions || [];
    const inserted = await Institution.insertMany(arr, { ordered: false });
    res.json({ success: true, count: inserted.length });
  } catch (err) { res.status(500).json({ error: err.message }); }
});
module.exports = router;
