import mongoose from 'mongoose';

const supportSchema = new mongoose.Schema({
    studId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'students',
    required: true
  },
  category : {
    type: String,
    enum: ['feedback', 'issue'],
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  }, 
}, { timestamps: true });
  

const Support = mongoose.model('supports', supportSchema);
export default Support;
