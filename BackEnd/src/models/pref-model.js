import mongoose from "mongoose";

const PreferenceSchema = new mongoose.Schema(
    {
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "students", // Reference to the school model
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
        boards: {
            type: String,
            required: true,
           enum: [
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
]

        },
        preferredStandard: {
            type: String,
            required: true,
            enum: ['playSchool', 'pre-primary', 'primary', 'secondary']
        },
        interests: {
            type: String,
            enum: [
                'Focusing on Academics',
                'Focuses on Practical Learning',
                'Focuses on Theoretical Learning',
                'Empowering in Sports',
                'Empowering in Arts',
                'Special Focus on Mathematics',
                'Special Focus on Science',
                'Special Focus on Physical Education',
                'Leadership Development',
                'STEM Activities',
                'Cultural Education',
                'Technology Integration',
                'Environmental Awareness'
            ],
        },
        schoolType: {
            type: String,
            required: true,
            enum: ['convent', 'private', 'government']
        },
        shift: {
            type: String,
            required: true,
            enum: ['morning', 'afternoon', 'night school']
        }
    },
    {
        timestamps: true
    }
);

const Preference = mongoose.model("preferences", PreferenceSchema);
export default Preference;