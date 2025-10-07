import School from '../models/school-model.js';
// From files in src/controllers/ or src/services/
import cloudinary from '../../config/cloudinary.js';
import streamifier from 'streamifier';

// Add school
export const addSchoolService = async (data) => {
  const {
    name, description, board, state, city,area, latitude,longitude,schoolMode, genderType, shifts, feeRange,
    address, pinCode, upto, email, mobileNo, specialist, tags, website, status,
    languageMedium, transportAvailable,rank, TeacherToStudentRatio
  } = data;

  const school = new School({
    name, description, board, state, city,area,latitude,longitude, schoolMode, genderType, shifts, feeRange,
    address, pinCode, upto, email, mobileNo, specialist, tags, website, status,
    languageMedium, transportAvailable,rank, TeacherToStudentRatio
  });

  return await school.save();
};

export const uploadSchoolPhotosService = async (schoolId, files) => {
  try {
    const school = await School.findById(schoolId);
    if (!school) {
      const error = new Error('School not found');
      error.statusCode = 404;
      throw error;
    }

    // Check if adding these files would exceed 4 photos
    if (school.photos.length + files.length > 4) {
      const error = new Error('Maximum 4 photos allowed per school');
      error.statusCode = 400;
      throw error;
    }

    const uploadPromises = files.map(file => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'schools/photos',
            resource_type: 'image'
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve({
                url: result.secure_url,
                publicId: result.public_id
              });
            }
          }
        );
        streamifier.createReadStream(file.buffer).pipe(stream);
      });
    });

    const uploadedPhotos = await Promise.all(uploadPromises);
    
    // Add all new photos to the school
    school.photos.push(...uploadedPhotos);
    await school.save();
    
    return school;
  } catch (error) {
    throw error;
  }
};

// Upload single video (replace existing)
export const uploadSchoolVideoService = async (schoolId, file) => {
  try {
    const school = await School.findById(schoolId);
    if (!school) {
      const error = new Error('School not found');
      error.statusCode = 404;
      throw error;
    }

    // Delete existing video if any
    if (school.video && school.video.publicId) {
      await cloudinary.uploader.destroy(school.video.publicId, { 
        resource_type: 'video' 
      });
    }

    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'schools/videos',
          resource_type: 'video'
        },
        async (error, result) => {
          if (error) {
            reject(error);
          } else {
            // Update or set the video
            school.video = {
              url: result.secure_url,
              publicId: result.public_id
            };
            await school.save();
            resolve(school);
          }
        }
      );
      streamifier.createReadStream(file.buffer).pipe(stream);
    });
  } catch (error) {
    throw error;
  }
};
// Get school by ID
export const getSchoolByIdService = async (schoolId) => {
  const school = await School.findById(schoolId);

  if (!school) {
    const error = new Error('School not found');
    error.statusCode = 404;
    throw error;
  }

  return school;
};

// Get schools by status
export const getSchoolsByStatusService = async (status) => {
  const allowedStatus = ['pending', 'accepted', 'rejected'];
  if (!allowedStatus.includes(status)) {
    const error = new Error('Invalid status. Must be pending, accepted, or rejected.');
    error.statusCode = 400;
    throw error;
  }

  const schools = await School.find({ status });
  
  if (!schools || schools.length === 0) {
    const error = new Error(`No schools found with status: ${status}`);
    error.statusCode = 404;
    throw error;
  }

  return schools;
};

// Update school info
export const updateSchoolInfoService = async (schoolId, data) => {
  const updatedSchool = await School.findByIdAndUpdate(schoolId, data, {
    new: true,
    runValidators: true
  });

  if (!updatedSchool) {
    const error = new Error('School not found');
    error.statusCode = 404;
    throw error;
  }

  return updatedSchool;
};

// Delete school
export const deleteSchoolService = async (schoolId) => {
  const deletedSchool = await School.findByIdAndDelete(schoolId);
  if (!deletedSchool) {
    const error = new Error('School not found');
    error.statusCode = 404;
    throw error;
  }

  return deletedSchool;
};

// In school-services.js

// Delete specific photo
export const deleteSchoolPhotoService = async (schoolId, publicId) => {
  try {
    // Delete from Cloudinary
    await cloudinary.uploader.destroy(publicId);
    
    // Remove from database
    const school = await School.findByIdAndUpdate(
      schoolId,
      {
        $pull: {
          photos: { publicId }
        }
      },
      { new: true }
    );
    
    if (!school) {
      const error = new Error('School not found');
      error.statusCode = 404;
      throw error;
    }
    
    return school;
  } catch (error) {
    throw error;
  }
};

// Delete video
export const deleteSchoolVideoService = async (schoolId) => {
  try {
    const school = await School.findById(schoolId);
    if (!school) {
      const error = new Error('School not found');
      error.statusCode = 404;
      throw error;
    }

    // Delete from Cloudinary if exists
    if (school.video && school.video.publicId) {
      await cloudinary.uploader.destroy(school.video.publicId, { 
        resource_type: 'video' 
      });
    }

    // Remove from database
    school.video = undefined;
    await school.save();
    
    return school;
  } catch (error) {
    throw error;
  }
};

// In school-services.js

// Get all photos for a school
export const getSchoolPhotosService = async (schoolId) => {
  const school = await School.findById(schoolId).select('photos');
  
  if (!school) {
    const error = new Error('School not found');
    error.statusCode = 404;
    throw error;
  }
  
  return school.photos;
};

// Get all videos for a school  
export const getSchoolVideosService = async (schoolId) => {
  const school = await School.findById(schoolId).select('videos');
  
  if (!school) {
    const error = new Error('School not found');
    error.statusCode = 404;
    throw error;
  }
  
  return school.videos;
};

// Get specific photo by publicId
export const getSchoolPhotoService = async (schoolId, publicId) => {
  const school = await School.findById(schoolId);
  
  if (!school) {
    const error = new Error('School not found');
    error.statusCode = 404;
    throw error;
  }
  
  const photo = school.photos.find(photo => photo.publicId === publicId);
  
  if (!photo) {
    const error = new Error('Photo not found');
    error.statusCode = 404;
    throw error;
  }
  
  return photo;
};

// Get specific video by publicId
export const getSchoolVideoService = async (schoolId, publicId) => {
  const school = await School.findById(schoolId);
  
  if (!school) {
    const error = new Error('School not found');
    error.statusCode = 404;
    throw error;
  }
  
  const video = school.videos.find(video => video.publicId === publicId);
  
  if (!video) {
    const error = new Error('Video not found');
    error.statusCode = 404;
    throw error;
  }
  
  return video;
};
// Make sure this helper function is in the file
function getDistanceInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export const getNearbySchoolsService = async (longitude, latitude, state) => {
  console.log(`--- DEBUG: Searching for schools with status: "accepted" and state: "${state}" ---`);

  // Find schools matching the state
  const stateSchools = await School.find({ status: 'accepted', state: state });

  console.log(`--- DEBUG: Found ${stateSchools.length} schools in that state.`);

  if (stateSchools.length === 0) {
    console.log("--- DEBUG: Since no schools were found for the state, the filter will stop here.");
    return [];
  }

  // Filter the found schools by distance
  const nearbySchools = stateSchools.filter(school => {
    if (!school.latitude || !school.longitude) {
      console.log(`--- DEBUG: Skipping school "${school.name}" because it has no coordinates.`);
      return false;
    }
    const distance = getDistanceInKm(latitude, longitude, school.latitude, school.longitude);
    console.log(`--- DEBUG: Distance to "${school.name}" is ${distance.toFixed(2)} km.`);
    return distance <= 4;
  });
  
  console.log(`--- DEBUG: After filtering, found ${nearbySchools.length} schools within 4km.`);
  return nearbySchools;
};