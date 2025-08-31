// config/multer-config.js
import multer from 'multer';

// 5MB limit for photos
export const photoUpload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed for photos!'), false);
    }
  }
});

// 20MB limit for videos  
export const videoUpload = multer({
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only video files are allowed for videos!'), false);
    }
  }
});

export default { photoUpload, videoUpload };