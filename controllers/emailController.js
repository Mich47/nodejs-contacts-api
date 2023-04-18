const { emailService } = require("../services");

const sendVerificationEmail = async (req, res) => {
  const message = await emailService.sendVerificationEmail(req.user);

  res.status(200).json({ message });
};

module.exports = { sendVerificationEmail };
