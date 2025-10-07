import {
  addSchoolService,
  getSchoolByIdService,
  getSchoolsByStatusService,
  updateSchoolInfoService,
  deleteSchoolService,
  uploadSchoolPhotosService,
  uploadSchoolVideoService,
  deleteSchoolPhotoService,
  deleteSchoolVideoService,
  getSchoolPhotoService,
  getSchoolPhotosService,
  getSchoolVideoService,
  getNearbySchoolsService,
  getSchoolVideosService
} from '../services/school-services.js';

// Add school
export const addSchool = async (req, res) => {
  try {
    const saveSchool = await addSchoolService(req.body);
    
    res.status(201).json({
      status: "success",
      message: "School added successfully",
      data: saveSchool
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'Failed', 
      message: error.message 
    });
  }
};


export const uploadSchoolPhotos = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        status: 'Failed',
        message: 'No files uploaded'
      });
    }

    // Check if more than 4 files
    if (req.files.length > 4) {
      return res.status(400).json({
        status: 'Failed',
        message: 'Maximum 4 photos allowed per upload'
      });
    }

    const school = await uploadSchoolPhotosService(req.params.id, req.files);
    
    res.status(200).json({
      status: 'success',
      message: 'Photos uploaded successfully',
      data: school
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'Failed',
      message: error.message
    });
  }
};

// Upload school video (single)
export const uploadSchoolVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 'Failed',
        message: 'No file uploaded'
      });
    }
    
    const school = await uploadSchoolVideoService(req.params.id, req.file);
    
    res.status(200).json({
      status: 'success',
      message: 'Video uploaded successfully',
      data: school
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'Failed',
      message: error.message
    });
  }
};
// Get school by Id 
export const getSchoolById = async (req, res) => {
  try {
    const school = await getSchoolByIdService(req.params.id);
    
    res.status(200).json({
      status: 'success',
      message: 'School fetched successfully',
      data: school
    });
  } catch (error) {
    res.status(500).json({
      status: 'Failed',
      message: error.message
    });
  }
};

// Get school by status
export const getSchoolsByStatus = async (req, res) => {
  try {
    const { status } = req.params; 
    const schools = await getSchoolsByStatusService(status);
    
    res.status(200).json({
      status: 'success',
      message: `Fetched schools with status: ${status}`,
      data: schools
    });
  } catch (error) {
    res.status(500).json({
      status: 'Failed',
      message: error.message
    });
  }
};

// Update school info 
export const updateSchoolInfo = async (req, res) => {
  try {
    const updatedSchool = await updateSchoolInfoService(req.params.id, req.body);
    
    res.status(200).json({ 
      status: "success",
      message: 'School info updated successfully', 
      data: updatedSchool 
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'Failed', 
      message: error.message 
    });
  }
};

// Delete school 
export const deleteSchool = async (req, res) => {
  try {
    const deletedSchool = await deleteSchoolService(req.params.id);
    
    res.status(200).json({
      status: "success",
      message: "School deleted successfully",
      data: deletedSchool
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message
    });
  }
};

// Delete school photo
export const deleteSchoolPhoto = async (req, res) => {
  try {
    const { id, publicId } = req.params;
    const school = await deleteSchoolPhotoService(id, publicId);
    
    res.status(200).json({
      status: "success",
      message: "Photo deleted successfully",
      data: school
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Failed",
      message: error.message
    });
  }
};

// Delete school video
export const deleteSchoolVideo = async (req, res) => {
  try {
    const { id, publicId } = req.params;
    const school = await deleteSchoolVideoService(id, publicId);
    
    res.status(200).json({
      status: "success",
      message: "Video deleted successfully",
      data: school
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Failed",
      message: error.message
    });
  }
};

// In school-controllers.js

// Get all photos for a school
export const getSchoolPhotos = async (req, res) => {
  try {
    const photos = await getSchoolPhotosService(req.params.id);
    
    res.status(200).json({
      status: 'success',
      message: 'Photos retrieved successfully',
      count: photos.length,
      data: photos
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'Failed',
      message: error.message
    });
  }
};

// Get all videos for a school
export const getSchoolVideos = async (req, res) => {
  try {
    const videos = await getSchoolVideosService(req.params.id);
    
    res.status(200).json({
      status: 'success',
      message: 'Videos retrieved successfully',
      count: videos.length,
      data: videos
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'Failed',
      message: error.message
    });
  }
};

// Get specific photo by publicId
export const getSchoolPhoto = async (req, res) => {
  try {
    const photo = await getSchoolPhotoService(req.params.id, req.params.publicId);
    
    res.status(200).json({
      status: 'success',
      message: 'Photo retrieved successfully',
      data: photo
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'Failed',
      message: error.message
    });
  }
};

// Get specific video by publicId
export const getSchoolVideo = async (req, res) => {
  try {
    const video = await getSchoolVideoService(req.params.id, req.params.publicId);
    
    res.status(200).json({
      status: 'success',
      message: 'Video retrieved successfully',
      data: video
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'Failed',
      message: error.message
    });
  }
};

// --- UPDATE THIS CONTROLLER FUNCTION ---
export const getNearbySchools = async (req, res) => {
  try {
    // 1. Get 'state' from the query parameters as well
    const { lat, lon, state } = req.query;

    if (!lat || !lon || !state) {
      return res.status(400).json({ message: 'Latitude, longitude, and state are required.' });
    }

    // 2. Pass all three parameters to the service
    const schools = await getNearbySchoolsService(parseFloat(lon), parseFloat(lat), state);
    
    const cardData = schools.map(school => ({
        schoolId: school._id,
        name: school.name,
        // ... all other fields for the card model
        latitude: school.latitude,
        longitude: school.longitude,
    }));

    res.status(200).json({
      status: 'success',
      message: 'Fetched nearby schools successfully',
      data: cardData
    });

  } catch (error) {
    res.status(500).json({
      status: 'Failed',
      message: error.message
    });
  }
};