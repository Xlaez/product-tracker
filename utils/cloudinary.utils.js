const path = require("path");
const { v2 } = require("cloudinary");
const { cloudinary } = require("../config/index.config");

require("dotenv").config({ path: path.resolve(process.cwd(), ".env") });

v2.config(cloudinary);

const uploadSingle = async (filePath) => {
  const { secure_url } = await v2.uploader.upload(filePath);
  return { url: secure_url };
};

const deleteSingle = async (fileUrl) => {
  return await v2.uploader.destroy(fileUrl);
};

module.exports = {
  uploadSingle,
  deleteSingle,
};
