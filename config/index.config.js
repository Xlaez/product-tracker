const envVars = {
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_SECRET_KEY: process.env.CLOUDINARY_SECRET_KEY,
  SMTP_PASS: process.env.SMTP_PASS,
  SMTP_TYPE: process.env.SMTP_TYPE,
  SMTP_USER: process.env.SMTP_USER,
};

module.exports = {
  cloudinary: {
    cloud_name: envVars.CLOUDINARY_NAME,
    api_key: envVars.CLOUDINARY_API_KEY,
    api_secret: envVars.CLOUDINARY_SECRET_KEY,
  },
  email: {
    type: envVars.SMTP_TYPE,
    user: envVars.SMTP_USER,
    pass: envVars.SMTP_PASS,
  },
};
