const Joi = require("joi");
const { getValidationErrorMessage, AppError } = require("../../helpers");

const checkUpdatedStatus = (req, _, next) => {
  const { body } = req;

  const schema = Joi.object({
    favorite: Joi.boolean().required(),
  });

  const { error } = schema.validate(body);

  if (!error) return next();

  const message = getValidationErrorMessage(error);

  next(new AppError(400, message));
};

module.exports = checkUpdatedStatus;
