const { asyncWrapper } = require("../helpers");
const authService = require("../services/authService");

/**
 * Controller. Create new user
 */
const signupUser = asyncWrapper(async (req, res) => {
  const user = await authService.signup(req.body);

  res.status(200).json({ user });
});

/**
 * Controller. Verify user.
 */
const verifyUser = asyncWrapper(async (req, res) => {
  const { _id } = req.user;

  await authService.verify(_id);

  res.status(200).json({ message: "Verification successful" });
});

/**
 * Controller. Login user
 */
const loginUser = asyncWrapper(async (req, res) => {
  const { _id } = req.user;

  const user = await authService.login(_id);

  res.status(200).json(user);
});

/**
 * Controller. Logout user
 */
const logoutUser = asyncWrapper(async (req, res) => {
  const { _id } = req.user;

  await authService.logout(_id);

  res.sendStatus(204);
});

/**
 * Controller. Get current user data
 */
const getCurrentUser = asyncWrapper(async (req, res) => {
  const { _id } = req.user;

  const currentUser = await authService.getUser(_id);

  res.status(200).json(currentUser);
});

/**
 * Controller. Update the subscription of the current user.
 * Must be one of ["starter", "pro", "business"]
 */
const updateSubscription = asyncWrapper(async (req, res) => {
  const { _id } = req.user;
  const { body } = req;

  const userSubscription = await authService.updateUserSubscription(_id, body);

  res.status(200).json(userSubscription);
});

/**
 * Controller. Update the avatar of the current user.
 */
const updateAvatar = asyncWrapper(async (req, res) => {
  const { _id } = req.user;
  const { file } = req;

  const userAvatar = await authService.updateUserAvatar(_id, file);

  res.status(200).json(userAvatar);
});

module.exports = {
  signupUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateSubscription,
  updateAvatar,
  verifyUser,
};
