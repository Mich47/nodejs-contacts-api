const multer = require("multer");
const path = require("path");
const { AppError } = require("../helpers");

const TMP_DIR = path.join(process.cwd(), "tmp");
const FILE_SIZE_LIMIT = 5 * 1024 * 1024;

const uploadImage = (fieldName) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, TMP_DIR);
    },
    filename: function (req, file, cb) {
      const [originalName, fileExt] = file.originalname.split(".");
      const tmpFileName = originalName + "-" + Date.now() + "." + fileExt;

      cb(null, tmpFileName);
    },
  });

  function fileFilter(req, file, cb) {
    const isImage = file.mimetype.split("/")[0] === "image";

    if (!isImage) {
      cb(new AppError(400, "Unsupported image file type"), false);
    }
            
    cb(null, true);
  }

  return multer({
    storage,
    fileFilter,
    limits: { fileSize: FILE_SIZE_LIMIT },
  }).single(fieldName);
};

module.exports = { uploadImage };
