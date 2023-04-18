const { AppError } = require("../../helpers");
const { User } = require("../../models");

const checkVerificationToken = async (req, _, next) => {
  const { verificationToken } = req.params;

  try {
    const user = await User.findOne({ verificationToken }).select(
      "verificationToken email"
    );

    if (!user) {
      return next(new AppError(404, "User not found"));
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = checkVerificationToken;
