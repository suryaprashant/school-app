import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
    {
        authId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "auths", 
            required: true
        },

        email: {
            type: String,
            required: true
        },
        contactNo: {
            type: String,
            required: true
        },
        dateOfBirth: {
            type: Date,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            enum: ['male', 'female', 'other'],
            required: true
        },
        state: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        userType: {
            type: String,
            enum: ['student','parent'], // Since this is only for students
            required: true
        },
      shortlistedSchools: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "schools",
      default: []  
    }
    },
    {
        timestamps: true
    }
);

const Student = mongoose.model("students", StudentSchema);
export default Student;
