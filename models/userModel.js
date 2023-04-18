const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const { enums } = require("../constants");
const { jwtToken } = require("../helpers");
const gravatar = require("gravatar");
const uuid = require("uuid").v4;

const userModel = new Schema({
  password: {
    type: String,
    required: [true, "Set password for user"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: Object.values(enums.SUBSCRIPTION_ENUM),
    default: enums.SUBSCRIPTION_ENUM.STARTER,
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: {
    type: String,
    default: null,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    default: null,
    required: [true, "Verify token is required"],
  },
});

/**
 * Auto verification token generating
 */
userModel.pre("validate", async function (next) {
  if (this.isNew) {
    this.verificationToken = uuid().replaceAll("-", "");
  }

  next();
});

/**
 * Auto password hashing and avatar generating
 */
userModel.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  if (this.isNew) {
    this.avatarURL = gravatar.url(
      this.email,
      { s: "250", r: "x", d: "identicon" },
      true
    );
  }

  next();
});

/**
 * Auto token generating for new user
 */
userModel.post("validate", function (_, next) {
  if (this.token) return next();

  this.token = jwtToken.jwtTokenSign(this._id);

  next();
});

userModel.methods.comparePassword = (myPlaintextPassword, hash) =>
  bcrypt.compare(myPlaintextPassword, hash);

const User = model("users", userModel);

module.exports = User;
