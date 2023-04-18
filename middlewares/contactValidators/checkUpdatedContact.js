const Joi = require("joi");
const { joiRegex } = require("../../constants");
const { getValidationErrorMessage, AppError } = require("../../helpers");

const checkUpdatedContact = (req, _, next) => {
  const { body } = req;

  if (!Object.keys(body).length) {
    return next(new AppError(400, "missing fields"));
  }

  const schema = Joi.object({
    name: Joi.string().regex(joiRegex.NAME_REGEX).min(3).max(60),
    email: Joi.string().email({ tlds: { allow: false } }),
    phone: Joi.string().regex(joiRegex.PHONE_REGEX),
  });

  const { error } = schema.validate(body);

  if (!error) return next();

  const message = getValidationErrorMessage(error);

  next(new AppError(400, message));
};

module.exports = checkUpdatedContact;
