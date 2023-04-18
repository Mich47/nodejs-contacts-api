const {
  Types: { ObjectId },
} = require("mongoose");
const { AppError, jwtToken } = require("../../helpers");
const { User } = require("../../models");

const checkUserToken = async (req, _, next) => {
  const { authorization = "" } = req.headers;

  const [tokenType, token] = authorization.split(" ");

  if (!token || tokenType !== "Bearer") {
    return next(new AppError(401, "Not authorized"));
  }

  let id = null;
  try {
    id = jwtToken.jwtTokenVerify(token).id;
  } catch (error) {
    return next(new AppError(401, "Not authorized"));
  }

  const isValidId = ObjectId.isValid(id);
  if (!isValidId) {
    return next(new AppError(401, "Not authorized"));
  }

  const user = await User.findById(id).select("-password -__v");

  if (!user || user.token !== token) {
    return next(new AppError(401, "Not authorized"));
  }

  req.user = user;

  next();
};

module.exports = checkUserToken;
