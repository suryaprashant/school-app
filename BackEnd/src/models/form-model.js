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
        type: String,
        required: true,
    }, //PDF for the form
    status: {
        type: String,
        enum: ['Pending', 'Reviewed', 'Accepted', 'Rejected'],
        default: 'Pending',
    }
}, { timestamps: true });

const Form = mongoose.model('forms', FormSchema);
export default Form;