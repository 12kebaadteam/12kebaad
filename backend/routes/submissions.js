const express = require('express');
const router = express.Router();
const Submission = require('../models/StudentSubmission');
router.post('/', async (req, res) => {
  try {
    const { name, mobile, state, stream, selectedCourse } = req.body;
    const doc = new Submission({ name, mobile, state, stream, selectedCourse, ip: req.ip });
    const saved = await doc.save();
    res.json({ success: true, id: saved._id });
  } catch (err) { res.status(500).json({ error: err.message }); }
});
router.get('/', async (req, res) => {
  const items = await Submission.find().limit(1000).sort({ createdAt: -1 });
  res.json(items);
});
module.exports = router;
