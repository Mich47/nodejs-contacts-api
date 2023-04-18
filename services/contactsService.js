const { Contact } = require("../models");

/**
 * Get all contacts of current user
 * @returns Array of all contacts
 */
const listContacts = async (owner, { page, limit, favorite }) => {
  const skip = (page - 1) * limit;
  const filter = favorite ? { owner, favorite } : { owner };

  return await Contact.find(filter).select("-__v").skip(skip).limit(limit);
};

/**
 * Get contact by ID
 * @returns Object of contact
 */
const getContactById = async (contactId) => {
  return await Contact.findById(contactId)
    .select("-__v")
    .populate("owner", "email subscription -_id");
};

/**
 * Remove contact by ID
 */
const removeContact = async (contactId) => {
  await Contact.findByIdAndDelete(contactId);
};

/**
 * Add new contact
 * @returns Object of added contact
 */
const addContact = async (body) => {
  const newContact = await Contact.create(body);
  newContact.__v = undefined;

  return newContact;
};

/**
 * Update an existing contact
 * @returns Object of updated contact
 */
const updateContact = async (contactId, body) => {
  const updatedContact = Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  }).select("-__v");

  return updatedContact;
};

/**
 * Update "status" field in the contact
 * @returns Object of updated contact
 */
const updateStatusContact = async (contactId, body) => {
  const updatedContact = Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  }).select("-__v");

  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
