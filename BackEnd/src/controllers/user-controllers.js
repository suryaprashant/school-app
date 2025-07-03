import Student from "../models/user-model.js";

// POST /add
export const addStudent = async (req, res) => {
    try {
        const { authId, email, contactNo, dateOfBirth, name, gender, state, city, userType} = req.body;

        // Check if student already exists for this authId
        const existingStudent = await Student.findOne({ authId });
        if (existingStudent) {
            return res.status(400).json({ status: "Student Already Exists",
                                          message: error.message
                                        });
        }

        const newStudent = new Student({
            authId,
            email,
            contactNo,
            dateOfBirth,
            name,
            gender,
            state,
            city,
            userType,
           
        });

        await newStudent.save();
        res.status(201).json({
      status: "success",
      message: "Student added successfully",
      data: {
       student: newStudent
      }
    });
  }
  catch (err) {
        res.status(500).json({ 
      status: "Error Adding Students",
      message: error.message });
    }
  };

// PUT /update/:authId
export const updateStudent = async (req, res) => {
    try {
        const { authId } = req.params;
        const updates = req.body;

        const updatedStudent = await Student.findOneAndUpdate(
            { authId },
            updates,
            { new: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({  status: "Student Not Found",
      message: error.message });
        }

        res.status(200).json({status : 'success', message: "Student updated successfully", data:{student: updatedStudent }});
    } catch (err) {
        res.status(500).json({ status: "Error updating student", message: error.message });
    }
};

// DELETE /delete/:authId
export const deleteStudent = async (req, res) => {
    try {
        const { authId } = req.params;

        const deletedStudent = await Student.findOneAndDelete({ authId });

        if (!deletedStudent) {
            return res.status(404).json({ message: error.message });
        }

        res.status(200).json({status : 'success', message: "Student deleted successfully" });
    } catch (err) {
        res.status(500).json({ status: "Error deleting student", message: error.message });
    }
};

// GET /:authId
export const getStudent = async (req, res) => {
    try {
        const { authId } = req.params;

        const student = await Student.findOne({ authId });

        if (!student) {
            return res.status(404).json({ status: "Student not found",message:error.message });
        }

        res.status(200).json(student);
    } catch (err) {
        res.status(500).json({ status: "Error fetching student", message: error.message  });
    }
};
