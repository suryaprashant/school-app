import { getSchoolsByFeeRange, getSchoolsByShift } from '../services/filter-services.js';

export const getSchoolByFeeRange = async (req, res) => {
  try {
    const { feeRange } = req.query;

    if (!feeRange) {
      return res.status(400).json({
        status: "failed",
        message: "feeRange query parameter is required"
      });
    }

    const schools = await getSchoolsByFeeRange(feeRange);

    res.status(200).json({
      status: "success",
      message: "Schools successfully filtered by feeRange",
      data: schools
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'Failed', 
      message: error.message 
    });
  }
};

//Filter by Shift
export const getSchoolByShift = async (req, res) => {
  try {
      const { shifts } = req.query; 

 if (!shifts) {
      return res.status(400).json({
        status: "failed",
        message: "Shift query parameter is required"
      });
    }
    const schools = await getSchoolsByShift(shifts);
    
 if (!schools || schools.length === 0) {
      return res.status(404).json({
        status: "failed",
        message: `No schools found for shift: ${shifts}`
      });
    }

    res.status(200).json({
      status: "success",
      message: "Schools successfully filtered by shift",
      data: schools
    });
  } catch (error) {
    res.status(500).json({ 
    status: 'Failed', 
    message: error.message });
  }
};
