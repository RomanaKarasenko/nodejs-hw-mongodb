import createError from 'http-errors';
import {
  getContact,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from '../services/contacts.js';

export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await getContact();
    res.status(200).json({
      status: 'success',
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    next(createError(500, 'Failed to retrieve contacts', { cause: error }));
  }
};

export const getContactByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
      return next(createError(404, 'Contact not found'));
    }
    res.status(200).json({
      status: 'success',
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    next(createError(500, 'Failed to retrieve contact', { cause: error }));
  }
};
export const createContactController = async (req, res, next) => {
  try {
    const { name, phoneNumber, email, isFavourite, contactType } = req.body;
    if (!name || !phoneNumber) {
      return next(createError(400, 'Name and phone number are required'));
    }

    const newContact = await createContact({
      name,
      phoneNumber,
      email,
      isFavourite,
      contactType,
    });
    res.status(201).json({
      status: 'success',
      message: 'Successfully created a contact!',
      data: newContact,
    });
  } catch (error) {
    next(createError(500, 'Failed to create contact', { cause: error }));
  }
};
export const updateContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updateData = req.body;
    const updatedContact = await updateContact(contactId, updateData);
    if (!updatedContact) {
      return next(createError(404, 'Contact not found'));
    }
    res.status(200).json({
      status: 'success',
      message: 'Successfully patched a contact!',
      data: updatedContact,
    });
  } catch (error) {
    next(createError(500, 'Failed to update contact', { cause: error }));
  }
};
export const deleteContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await deleteContact(contactId);
    if (!deletedContact) {
      return next(createError(404, 'Contact not found'));
    }
    res.status(204).send();
  } catch (error) {
    next(createError(500, 'Failed to delete contact', { cause: error }));
  }
};
