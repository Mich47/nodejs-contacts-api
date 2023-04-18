const { imageService } = require("../../services");

const checkAndUploadUserAvatar = (req, res, next) => {
  try {
    const userAvatar = imageService.uploadImage("avatar");

    // Запускаємо multer
    userAvatar(req, res, next);
  } catch (error) {
    next(error);
  }
};

module.exports = checkAndUploadUserAvatar;
