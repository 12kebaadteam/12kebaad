const mongoose = require('mongoose');
const InstitutionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['College','University','OnlineProvider','Institute'], required: true },
  state: { type: String, required: true },
  city: String,
  address: String,
  coursesOffered: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  fees: { min: Number, max: Number, currency: { type: String, default: 'INR' } },
  cutoff: String,
  ownership: { type: String, enum: ['Government','Private','Public-Private'] },
  officialWebsite: String,
  registrationMode: { type: String, enum: ['Online','Offline','Both','ThroughUniversityPortal','Direct'] },
  isOnline: { type: Boolean, default: false },
  contactPhone: String,
  contactEmail: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Institution', InstitutionSchema);
