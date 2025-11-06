const mongoose = require('mongoose');
const CourseSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  stream: { type: String, enum: ['Science','Commerce','Humanities','Vocational','Other'], required: true },
  level: { type: String, enum: ['UG','PG','Diploma','Certificate','Short-term','Niche'], required: true },
  modality: { type: String, enum: ['Offline','Online','Hybrid'], required: true },
  description: String,
  tags: [String],
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Course', CourseSchema);
