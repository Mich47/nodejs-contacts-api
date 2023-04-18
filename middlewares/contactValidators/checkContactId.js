const {
  Types: { ObjectId },
} = require("mongoose");
const { AppError } = require("../../helpers");
const Contact = require("../../models/contactModel");

const checkContactId = async (req, _, next) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;

  try {
    const isValidId = ObjectId.isValid(contactId);
    if (!isValidId) {
      return next(new AppError(404, "Not found"));
    }

    const contact = await Contact.findById(contactId).select("-__v");

    if (!contact) {
      return next(new AppError(404, "Not found"));
    }

    const isValidOwner = contact.owner?.equals(owner);
    if (!isValidOwner) {
      return next(new AppError(404, "Not found"));
    }

    req.contact = contact;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = checkContactId;
