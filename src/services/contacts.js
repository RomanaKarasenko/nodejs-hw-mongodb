import Contact from '../db/models/Contact.js';

export const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  return contact;
};

export const getContact = async () => {
  const contacts = await Contact.find();
  return contacts;
};
