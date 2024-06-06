import Contact from '../db/models/Contact.js';

export const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  return contact;
};

export const getContact = async () => {
  const contacts = await Contact.find();
  return contacts;
};

export const createContact = async (contactData) => {
  const { name, phoneNumber } = contactData;

  if (!name || !phoneNumber) {
    throw new Error('Name and phone number are required');
  }

  const newContact = new Contact(contactData);
  await newContact.save();
  return newContact;
};

export const updateContact = async (contactId, updateData) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    updateData,
    { new: true },
  );
  return updatedContact;
};

export const deleteContact = async (contactId) => {
  const deletedContact = await Contact.findByIdAndDelete(contactId);
  return deletedContact;
};
