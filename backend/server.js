require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
import cors from "cors";

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://12kebaad.vercel.app",
      "https://one2kebaad-backend.onrender.com"
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(bodyParser.json({limit: '10mb'}));
const MONGO = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/12kebaad';
mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('MongoDB connected'))
  .catch(err => console.error('Mongo connect error', err.message));
// models
const Course = require('./models/Course');
const Institution = require('./models/Institution');
const Submission = require('./models/StudentSubmission');
// routes
const courseRoutes = require('./routes/courses');
const instRoutes = require('./routes/institutions');
const submissionRoutes = require('./routes/submissions');
app.use('/api/courses', courseRoutes);
app.use('/api/institutions', instRoutes);
app.use('/api/submissions', submissionRoutes);
app.get('/', (req, res) => res.send({ ok: true, service: '12kebaad backend' }));
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log('Server running on port', PORT));
