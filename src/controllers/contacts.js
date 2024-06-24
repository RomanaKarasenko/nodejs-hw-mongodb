import createHttpError from 'http-errors';
import {
  getContact,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getAllContacts = (req, res, next) => {
  const { _id: userId } = req.user;
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = { ...parseFilterParams(req.query), userId };

  getContact({ page, perPage, sortBy, sortOrder, filter, userId })
    .then((contacts) => {
      res.status(200).json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
      });
    })
    .catch(next);
};

export const getContactByIdController = (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;

  getContactById(contactId, userId)
    .then((contact) => {
      if (!contact) {
        throw createHttpError(404, 'Contact not found');
      }
      res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
      });
    })
    .catch(next);
};

export const createContactController = (req, res, next) => {
  const { _id: userId } = req.user;

  createContact({ ...req.body, userId })
    .then((contact) => {
      res.status(201).json({
        status: 201,
        message: 'Successfully created a contact!',
        data: contact,
      });
    })
    .catch(next);
};

export const updateContactController = (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;

  getContactById(contactId, userId)
    .then((contact) => {
      if (!contact) {
        throw createHttpError(404, 'Contact not found');
      }
      return updateContact(contactId, userId, req.body);
    })
    .then((updatedContact) => {
      res.status(200).json({
        status: 200,
        message: 'Successfully updated the contact!',
        data: updatedContact,
      });
    })
    .catch(next);
};

export const deleteContactController = (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;

  getContactById(contactId, userId)
    .then((contact) => {
      if (!contact) {
        throw createHttpError(404, 'Contact not found');
      }
      return deleteContact(contactId, userId);
    })
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};
