const Joi = require("joi");
const { getValidationErrorMessage, AppError } = require("../../helpers");

const checkEmail = (req, _, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
  });

  const { error } = schema.validate(req.body);

  if (!error) return next();

  const message = getValidationErrorMessage(error);

  next(new AppError(400, message));
};

module.exports = checkEmail;
