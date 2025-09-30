import {
  addInfrastructureService,
  getInfrastructureBySchoolIdService,
  updateInfrastructureService
} from '../services/infrastructure-services.js';

/**
 * Controller to add infrastructure details.
 */
export const addInfrastructure = async (req, res) => {
  try {
    // Check if infrastructure for this school already exists
    const existingInfra = await getInfrastructureBySchoolIdService(req.body.schoolId);
    if (existingInfra) {
      return res.status(409).json({
        status: 'failed',
        message: 'Infrastructure details for this school already exist. Please update instead.'
      });
    }

    const newInfrastructure = await addInfrastructureService(req.body);

    res.status(201).json({
      status: "success",
      message: "Infrastructure details added successfully",
      data: newInfrastructure
    });

  } catch (error) {
    res.status(500).json({
      status: 'Failed',
      message: error.message
    });
  }
};

/**
 * Controller to get infrastructure details by school ID.
 */
export const getInfrastructureById = async (req, res) => {
  try {
    const { id: schoolId } = req.params;
    const infrastructure = await getInfrastructureBySchoolIdService(schoolId);

    if (!infrastructure) {
      return res.status(404).json({
        status: 'failed',
        message: 'Infrastructure details not found for this school.'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Infrastructure details fetched successfully',
      data: infrastructure
    });
  } catch (error) {
    res.status(500).json({
      status: 'Failed',
      message: error.message
    });
  }
};

/**
 * Controller to update infrastructure details.
 */
export const updateInfrastructure = async (req, res) => {
  try {
    const { id: schoolId } = req.params;
    const updatedInfrastructure = await updateInfrastructureService(schoolId, req.body);

    if (!updatedInfrastructure) {
      return res.status(404).json({
        status: 'failed',
        message: 'Infrastructure not found for this school. Please add details first.'
      });
    }

    res.status(200).json({
      status: "success",
      message: "Infrastructure details updated successfully",
      data: updatedInfrastructure
    });

  } catch (error) {
    res.status(500).json({
      status: 'Failed',
      message: error.message
    });
  }
};