import createHttpError from 'http-errors';
import express from 'express';
import {
  getContact,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from '../services/contacts.js';

const app = express();

app.use(express.json());

export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await getContact();
    res.status(200).json({
      status: 200,
      message: 'Successfully retrieved contacts!',
      data: contacts,
    });
  } catch (error) {
    next(createHttpError(500, 'Failed to retrieve contacts', { cause: error }));
  }
};

export const getContactByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
      return next(createHttpError(404, {
        status: 404,
        message: 'Contact not found',
        data: { message: 'Contact not found' },
      }));
    }
    res.status(200).json({
      status: 200,
      message: `Successfully retrieved contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    next(createHttpError(500, 'Failed to retrieve contact', { cause: error }));
  }
};

export const createContactController = async (req, res, next) => {
  try {
    const { name, phoneNumber, email, isFavourite, contactType } = req.body;
    if (!name || !phoneNumber) {
      return next(createHttpError(400, 'Name and phone number are required'));
    }

    const newContact = await createContact({
      name,
      phoneNumber,
      email,
      isFavourite,
      contactType,
    });
    // Видалення поля __v з об'єкта контакту перед відправкою
    const contactWithoutVersion = newContact.toObject();
    delete contactWithoutVersion.__v;

    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: contactWithoutVersion,
    });
  } catch (error) {
    next(createHttpError(500, 'Failed to create contact', { cause: error }));
  }
};

export const updateContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updateData = req.body;
    const updatedContact = await updateContact(contactId, updateData);
    if (!updatedContact) {
      return next(createHttpError(404, {
        status: 404,
        message: 'Contact not found',
        data: { message: 'Contact not found' },
      }));
    }
    res.status(200).json({
      status: 200,
      message: 'Successfully updated a contact!',
      data: updatedContact,
    });
  } catch (error) {
    next(createHttpError(500, 'Failed to update contact', { cause: error }));
  }
};

export const deleteContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await deleteContact(contactId);
    if (!deletedContact) {
      return next(createHttpError(404, {
        status: 404,
        message: 'Contact not found',
        data: { message: 'Contact not found' },
      }));
    }
    res.status(204).json({
      status: 204,
      message: 'Successfully deleted the contact!',
      data: null,
    });
  } catch (error) {
    next(createHttpError(500, 'Failed to delete contact', { cause: error }));
  }
};
