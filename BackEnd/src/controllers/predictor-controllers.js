import { predictSchoolsService } from '../services/predictor-services.js';

export const predictSchools = async (req, res) => {
  try {
    const filters = req.body;
    
    if (!filters || Object.keys(filters).length === 0) {
      return res.status(400).json({
        status: 'Failed',
        message: 'Request body is required'
      });
    }
    const matchedSchools = await predictSchoolsService(filters);

 res.status(200).json({
      status: 'success',
      message: 'Result of school predictor',
      total: matchedSchools.length,
      data: matchedSchools
    });
  }catch (error) {
    res.status(500).json({
      status: 'Failed',
      message: error.message
    });
  }
};
