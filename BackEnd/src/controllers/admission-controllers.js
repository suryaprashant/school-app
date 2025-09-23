import School from '../models/school-model.js';

export const addAdmissionDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const admissionDetails = await School.findByIdAndUpdate(
            id,
            { admissionDetails: req.body },
            { new: true }
        );
        res.status(201).json(admissionDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAdmissionDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const school = await School.findById(id);
        res.status(200).json(school.admissionDetails);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const updateAdmissionDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedDetails = await School.findByIdAndUpdate(
            id,
            { admissionDetails: req.body },
            { new: true }
        );
        res.status(200).json(updatedDetails);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
