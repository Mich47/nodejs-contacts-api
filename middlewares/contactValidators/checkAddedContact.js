const Joi = require("joi");
const { enums, joiRegex } = require("../../constants");
const { getValidationErrorMessage, AppError } = require("../../helpers");

const checkAddedContact = (req, _, next) => {
  const schema = Joi.object({
    name: Joi.string().regex(joiRegex.NAME_REGEX).min(3).max(60).required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    phone: Joi.string().regex(joiRegex.PHONE_REGEX).required(),
    favorite: Joi.boolean(),
    owner: Joi.string().valid(...Object.values(enums.SUBSCRIPTION_ENUM)),
  });

  const { error } = schema.validate(req.body);

  if (!error) return next();

  const message = getValidationErrorMessage(error);

  next(new AppError(400, message));
};

module.exports = checkAddedContact;
