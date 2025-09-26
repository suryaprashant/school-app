import {
    addAdmissionService,
    getAdmissionBySchoolService,
    
    // updateAdmissionBySchoolService,
  } from "../services/admission-services.js";
  import Admission from "../models/admission-model.js";

  
  // POST /schools/admission/:id
  export const addAdmissionDetails = async (req, res) => {
    try {
      const data = { ...req.body, schoolId: req.params.id }; // Link to school
      const result = await addAdmissionService(data);
  
      res.status(201).json({
        status: "success",
        message: "Admission details added successfully",
        data: result,
      });
    } catch (err) {
      res.status(err.status || 500).json({
        status: "failed",
        message: err.message,
      });
    }
  };
  
  // GET /schools/admission/:id
  export const getAdmissionDetails = async (req, res) => {
    try {
      const { id: schoolId } = req.params;
      const data = await getAdmissionBySchoolService(schoolId);
  
      res.status(200).json({
        status: "success",
        data,
      });
    } catch (err) {
      res.status(err.status || 500).json({
        status: "failed",
        message: err.message,
      });
    }
  };
  
  // PUT /schools/admission/:id
//   export const updateAdmissionDetails = async (req, res) => {
//     try {
//       const { id: schoolId } = req.params;
//       const updates = req.body;
  
//       const result = await updateAdmissionBySchoolService(schoolId, updates);
  
//       res.status(200).json({
//         status: "success",
//         message: "Admission details updated successfully",
//         data: result,
//       });
//     } catch (err) {
//       res.status(err.status || 500).json({
//         status: "failed",
//         message: err.message,
//       });
//     }
//   };
// PUT /schools/admission/:id
// PUT /schools/admission/:id

export const updateAdmissionDetails = async (req, res) => {
    try {
      const { id } = req.params;       // admission _id
      const updates = req.body;
  
      const updatedAdmission = await Admission.findByIdAndUpdate(
        id,
        updates,
        { new: true }   // ✅ return updated document
      );
  
      if (!updatedAdmission) {
        return res.status(404).json({
          status: "failed",
          message: "Admission not found",
        });
      }
  
      res.status(200).json({
        status: "success",
        message: "Admission details updated successfully",
        data: updatedAdmission,   // now contains the updated admission
      });
    } catch (err) {
      res.status(err.status || 500).json({
        status: "failed",
        message: err.message,
      });
    }
  };
  
  // DELETE /schools/admission/:id
export const deleteAdmissionDetails = async (req, res) => {
    try {
      const { id } = req.params; // admission _id
  
      const deletedAdmission = await Admission.findByIdAndDelete(id);
  
      if (!deletedAdmission) {
        return res.status(404).json({
          status: "failed",
          message: "Admission not found",
        });
      }
  
      res.status(200).json({
        status: "success",
        message: "Admission deleted successfully",
        data: deletedAdmission, // optional, shows what was deleted
      });
    } catch (err) {
      res.status(err.status || 500).json({
        status: "failed",
        message: err.message,
      });
    }
  };
  
  
  