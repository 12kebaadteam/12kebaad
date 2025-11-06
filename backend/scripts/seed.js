const mongoose = require('mongoose');
const Course = require('../models/Course');
const Institution = require('../models/Institution');
require('dotenv').config();
const MONGO = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/12kebaad';
mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> seed()).catch(err=>console.error(err));
async function seed() {
  await Course.deleteMany({});
  await Institution.deleteMany({});
  const courses = [
    { code:'BSC-CS', title:'B.Sc. Computer Science', stream:'Science', level:'UG', modality:'Offline', description:'Undergraduate science degree' },
    { code:'BCOM', title:'B.Com', stream:'Commerce', level:'UG', modality:'Offline', description:'Bachelor of Commerce' },
    { code:'DIP-PLMB', title:'Diploma in Plumbing', stream:'Vocational', level:'Diploma', modality:'Offline', description:'Skill-based plumbing diploma' },
    { code:'CERT-DIGMARK', title:'Certificate in Digital Marketing', stream:'Other', level:'Certificate', modality:'Online', description:'Short online certificate' }
  ];
  const inserted = await Course.insertMany(courses);
  const lookup = {};
  inserted.forEach(c => lookup[c.code] = c._id);
  const insts = [
    { name:'Govt Degree College, Patna', type:'College', state:'Bihar', city:'Patna', coursesOffered:[lookup['BCOM']], fees:{min:0,max:20000}, cutoff:'45%', ownership:'Government', officialWebsite:'https://example.edu', registrationMode:'Online' },
    { name:'Skyline Institute of Tech', type:'Institute', state:'Maharashtra', city:'Mumbai', coursesOffered:[lookup['BSC-CS'], lookup['CERT-DIGMARK']], fees:{min:30000,max:120000}, cutoff:'60%', ownership:'Private', officialWebsite:'https://example.edu', registrationMode:'Online' },
    { name:'SkillUp Plumbing Academy', type:'Institute', state:'Delhi', city:'New Delhi', coursesOffered:[lookup['DIP-PLMB']], fees:{min:5000,max:20000}, cutoff:'No formal cutoff', ownership:'Private', officialWebsite:'https://example.edu', registrationMode:'Both' }
  ];
  await Institution.insertMany(insts);
  console.log('Seed completed');
  process.exit(0);
}
