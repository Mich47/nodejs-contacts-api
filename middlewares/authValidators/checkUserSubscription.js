const Joi = require("joi");
const { getValidationErrorMessage, AppError } = require("../../helpers");
const { enums } = require("../../constants");

const checkUserSubscription = (req, _, next) => {
  const { body } = req;

  const schema = Joi.object({
    subscription: Joi.string()
      .valid(...Object.values(enums.SUBSCRIPTION_ENUM))
      .required(),
  });

  const { error } = schema.validate(body);

  if (!error) return next();

  const message = getValidationErrorMessage(error);

  next(new AppError(400, message));
};

module.exports = checkUserSubscription;
