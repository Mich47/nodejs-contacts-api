const { AppError } = require("../../helpers");
const User = require("../../models/userModel");

const checkRegistrationConflict = async (req, _, next) => {
  const { email } = req.body;

  try {
    const isExistsEmail = await User.exists({ email });
    if (isExistsEmail) {
      return next(new AppError(409, "Email in use"));
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = checkRegistrationConflict;
