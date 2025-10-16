import mongoose from "mongoose";

const FormSchema = new mongoose.Schema({
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'schools',
        required: true,
    },
    studId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'students',
        required: true,
    },
    applicationForm: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pdfs',
        required: true,
    }, //PDF for the form
  status: {
        type: String,
        // 1. ADD THE NEW STATUS to the enum list
        enum: ['Pending', 'Reviewed', 'Accepted', 'Rejected', 'Interview'],
        default: 'Pending',
    },
    // 2. ADD THE NEW FIELD for the interview note
    interviewNote: {
        type: String,
        default: null // It will be null for all statuses except 'Call for Interview'
    }
}, { timestamps: true });

const Form = mongoose.model('forms', FormSchema);
export default Form;