require("dotenv").config();

const getVerificationUrl = (verificationToken) => {
  const verificationUrl =
    process.env.ORIGIN + "/api/users/verify/" + verificationToken;

  return verificationUrl;
};

module.exports = getVerificationUrl;
