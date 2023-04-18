const checkRegistrationConflict = require("./checkRegistrationConflict");
const checkLoginAuth = require("./checkLoginAuth");
const checkUserToken = require("./checkUserToken");
const checkUserSubscription = require("./checkUserSubscription");
const checkAuthData = require("./checkAuthData");
const checkAndUploadUserAvatar = require("./checkAndUploadUserAvatar");
const checkVerificationToken = require("./checkVerificationToken");
const checkVerificationEmail = require("./checkVerificationEmail");
const checkEmail = require("./checkEmail");

module.exports = {
  checkRegistrationConflict,
  checkLoginAuth,
  checkUserToken,
  checkUserSubscription,
  checkAuthData,
  checkAndUploadUserAvatar,
  checkVerificationToken,
  checkVerificationEmail,
  checkEmail,
};
