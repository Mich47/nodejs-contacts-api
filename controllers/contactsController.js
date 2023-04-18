const { asyncWrapper } = require("../helpers");
const { contactsService } = require("../services");

/**
 * Controller. Get array of all contacts and status
 */
const listContacts = asyncWrapper(async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;

  const query = {
    page: Number(page),
    limit: Number(limit),
    favorite,
  };

  const contacts = await contactsService.listContacts(owner, query);

  res.status(200).json(contacts);
});

/**
 * Controller. Get contact by ID and status
 */
const getContactById = asyncWrapper(async (req, res) => {
  const { contactId } = req.params;

  const contact = await contactsService.getContactById(contactId);

  res.status(200).json(contact);
});

/**
 * Controller. Remove contact by ID and return status
 */
const removeContact = asyncWrapper(async (req, res) => {
  const { contactId } = req.params;

  await contactsService.removeContact(contactId);

  res.status(200).json({ message: "contact deleted" });
});

/**
 * Controller. Add new contact, return status and Object of added contact
 */
const addContact = asyncWrapper(async (req, res) => {
  const { body } = req;
  const { _id: owner } = req.user;

  const newContact = await contactsService.addContact({ ...body, owner });

  res.status(201).json(newContact);
});

/**
 * Controller. Update an existing contact, return status and Object of updated contact
 */
const updateContact = asyncWrapper(async (req, res) => {
  const { body } = req;
  const { contactId } = req.params;

  const updatedContact = await contactsService.updateContact(contactId, body);

  res.status(200).json(updatedContact);
});

/**
 * Controller. Update field "favorite" of an existing contact, return status and Object of updated contact
 */
const updateStatusContact = asyncWrapper(async (req, res) => {
  const { body } = req;
  const { contactId } = req.params;

  const updatedContact = await contactsService.updateStatusContact(
    contactId,
    body
  );

  res.status(200).json(updatedContact);
});

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
