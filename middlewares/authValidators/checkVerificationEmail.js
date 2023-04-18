const { AppError } = require("../../helpers");
const { User } = require("../../models");

const checkVerificationEmail = async (req, _, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email }).select(
      "email verificationToken verify"
    );

    if (!user) {
      return next(new AppError(404, "User not found"));
    }

    if (user.verify) {
      return next(new AppError(400, "Verification has already been passed"));
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = checkVerificationEmail;
