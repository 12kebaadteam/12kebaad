require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

//  CORS config
app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, true);   //  allow all origins (temporary)
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

app.use(bodyParser.json({ limit: "10mb" }));

//  MONGO connection
const MONGO = process.env.MONGO_URI;
mongoose
  .connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongo connect error", err.message));

//  Models
const Course = require('./models/Course');
const Institution = require('./models/Institution');
const Submission = require('./models/StudentSubmission');

//  Routes
const courseRoutes = require('./routes/courses');
const instRoutes = require('./routes/institutions');
const submissionRoutes = require('./routes/submissions');

app.use('/api/courses', courseRoutes);
app.use('/api/institutions', instRoutes);
app.use('/api/submissions', submissionRoutes);

//  Home route
app.get('/', (req, res) => res.send({ ok: true, service: '12kebaad backend' }));

//  PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port`, PORT));
