const mongoose = require('mongoose');
const SubmissionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  state: { type: String, required: true },
  stream: { type: String, enum: ['Science','Commerce','Humanities','Vocational','Other'], required: true },
  selectedCourse: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  createdAt: { type: Date, default: Date.now },
  ip: String,
  metadata: mongoose.Schema.Types.Mixed
});
module.exports = mongoose.model('StudentSubmission', SubmissionSchema);
