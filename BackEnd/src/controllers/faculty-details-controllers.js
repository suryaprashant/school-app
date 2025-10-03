import School from '../models/faculty-details-model.js';

// Add a new teacher
export const addFaculty = async (req, res) => {
  try {
    const { schoolId } = req.params;
    const { name, qualification, experience } = req.body;

    if (!name || !qualification || experience === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const school = await School.findById(schoolId);
    if (!school) return res.status(404).json({ message: "School not found" });

    const newTeacher = { name, qualification, experience };
    school.facultyDetails.push(newTeacher);
    await school.save();

    res.status(201).json({ message: "Teacher added successfully", faculty: school.facultyDetails });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all teachers
export const getFaculty = async (req, res) => {
  try {
    const { schoolId } = req.params;
    const school = await School.findById(schoolId);
    if (!school) return res.status(404).json({ message: "School not found" });

    res.status(200).json({ faculty: school.facultyDetails });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a teacher
export const updateFaculty = async (req, res) => {
  try {
    const { schoolId, facultyId } = req.params;
    const { name, qualification, experience } = req.body;

    const school = await School.findById(schoolId);
    if (!school) return res.status(404).json({ message: "School not found" });

    const teacher = school.facultyDetails.id(facultyId);
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });

    if (name) teacher.name = name;
    if (qualification) teacher.qualification = qualification;
    if (experience !== undefined) teacher.experience = experience;

    await school.save();
    res.status(200).json({ message: "Teacher updated", faculty: teacher });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a teacher
export const deleteFaculty = async (req, res) => {
    try {
      const { schoolId, facultyId } = req.params;
  
      const school = await School.findById(schoolId);
      if (!school) return res.status(404).json({ message: "School not found" });
  
      // Pull the subdocument from the array
      const teacher = school.facultyDetails.id(facultyId);
      if (!teacher) return res.status(404).json({ message: "Teacher not found" });
  
      // Remove teacher from array
      school.facultyDetails.pull(teacher._id);
  
      await school.save();
      res.status(200).json({ message: "Teacher removed" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
