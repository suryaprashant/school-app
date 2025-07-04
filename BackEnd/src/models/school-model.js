import mongoose from 'mongoose';

const SchoolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  board: { type: String, required: true, enum: [
  'CBSE',
  'ICSE',
  'CISCE',
  'NIOS',
  'SSC',
  'IGCSE',
  'IB',
  'KVS',
  'JNV',
  'DBSE',
  'MSBSHSE',
  'UPMSP',
  'KSEEB',
  'WBBSE',
  'GSEB',
  'RBSE',
  'BSEB',
  'PSEB',
  'BSE',
  'SEBA',
  'MPBSE',
  'STATE',
  'OTHER'
] },
  state: { type: String, required: true },
  city: { type: String, required: true },
  schoolMode: { type: String, required: true , enum: ['convent', 'private', 'government']}, 
  genderType:{ type: String, required: true , enum: ['boy', 'girl', 'co-ed']},
  shifts: { type: [String],required: true, enum: ['morning', 'afternoon', 'night school']},
  feeRange: { type: String, required: true },
  upto: { type: String, required: true },
  email:{ type: String, required: true},
  mobileNo:{ type: String, required: true },
  specialist: { type: [String],required: false},
  tags:{ type: [String],required: false},
  website: { type: String, required: false },
  
  //image: { type: String, required: true }, 
  //logo: { type: String, required: true },
  //banner: { type: String, required: true },
}, { timestamps: true });

const School = mongoose.model('schools', SchoolSchema);
export default School;
