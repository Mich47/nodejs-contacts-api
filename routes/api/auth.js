const express = require("express");
const { authCtrl, emailCtrl } = require("../../controllers");
const { authValidators } = require("../../middlewares");

const router = express.Router();

router.post(
  "/register",
  authValidators.checkAuthData,
  authValidators.checkRegistrationConflict,
  authCtrl.signupUser
);

router.post(
  "/login",
  authValidators.checkAuthData,
  authValidators.checkLoginAuth,
  authCtrl.loginUser
);

router.post(
  "/verify",
  authValidators.checkEmail,
  authValidators.checkVerificationEmail,
  emailCtrl.sendVerificationEmail
);

router.get(
  "/verify/:verificationToken",
  authValidators.checkVerificationToken,
  authCtrl.verifyUser
);

router.use("/", authValidators.checkUserToken);

router.patch(
  "/",
  authValidators.checkUserSubscription,
  authCtrl.updateSubscription
);

router.post("/logout", authCtrl.logoutUser);

router.post("/current", authCtrl.getCurrentUser);

router.patch(
  "/avatars",
  authValidators.checkAndUploadUserAvatar,
  authCtrl.updateAvatar
);

module.exports = router;
