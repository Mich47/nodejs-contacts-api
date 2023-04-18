const { AppError } = require("../../helpers");
const User = require("../../models/userModel");

const checkLoginAuth = async (req, _, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("-__v");

    if (!user.verify) {
      return next(
        new AppError(400, "The user is not verified. Check your email")
      );
    }

    if (!user || !(await user.comparePassword(password, user.password))) {
      return next(new AppError(409, "Email or password is wrong"));
    }

    user.password = undefined;
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = checkLoginAuth;
