const Joi = require("joi");
const { joiRegex } = require("../../constants");
const { getValidationErrorMessage, AppError } = require("../../helpers");

const checkAuthData = (req, _, next) => {
  const schema = Joi.object({
    name: Joi.string().regex(joiRegex.NAME_REGEX).min(3).max(60),
    password: Joi.string().regex(joiRegex.PASSWORD_REGEX).required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
  });

  const { error } = schema.validate(req.body);

  if (!error) return next();

  const message = getValidationErrorMessage(error);

  next(new AppError(400, message));
};

module.exports = checkAuthData;
