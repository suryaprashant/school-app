import { addSupportService, getSupportByStudIdService, getSupportBySupIdService ,deleteSupportBySupIdService} from '../services/support-services.js';

//add Support data
export const addSupport = async (req, res) => {
  try {
    const newSupport = await addSupportService(req.body);

    res.status(201).json({
      status: "success",
      message: "Support request submitted successfully",
      data: newSupport
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message
    });
  }
};

//Get by student id
export const getSupportByStudId = async (req, res) => {
  try {
   const studId = req.params.studId.trim();

    const support = await getSupportByStudIdService(studId);
     if (!support || support.length === 0) {
      return res.status(404).json({
        status: 'failed',
        message: 'No support found by this studId'
      });
    }

     res.status(200).json({
      status: "success",
      message: "Fetch support successfully by studId",
      data: support
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message
    });
  }
};

//GET Support by supportId
export const getSupportBySupId = async (req, res) => {
  try {
  
    const supportId = req.params.supportId.trim();
    const support = await getSupportBySupIdService(supportId );
    if (!support) {
      return res.status(404).json({ 
        status: 'failed',
        message: 'Support not found' });
    }
   
  res.status(200).json({
      status: "success",
      message: "Fetch support successfully by supportId",
      data: support
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message
    });
  }
};

//DELETE Support by supportId
export const deleteSupportBySupId = async (req, res) => {
  try {
    
    const supportId = req.params.supportId.trim();
    const deleted = await deleteSupportBySupIdService(supportId);

  if (!deleted) {
      return res.status(404).json({ 
        status: 'failed',
        message: 'Support not found' });
    }
   
  res.status(200).json({
      status: "success",
      message: "Support deleted successfully",
      data: deleted
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message
    });
  }
};