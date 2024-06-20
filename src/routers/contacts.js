import { Router } from 'express';
import {
  getAllContacts,
  getContactByIdController,
  createContactController,
  updateContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import validateMongoId from '../middlewares/validateMongoId.js';
import validateBody from '../middlewares/validateBody.js';
import { createContactsSchema } from '../validation/contactsShema.js';
import { updateContactsSchema } from '../validation/updateContactsSchema.js';

const router = Router();

export const ctrlWrapper = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

router.use('/:contactId', validateMongoId('contactId'));
router.get('/', ctrlWrapper(getAllContacts));
router.get('/:contactId', ctrlWrapper(getContactByIdController));
router.post(
  '/',
  validateBody(createContactsSchema),
  ctrlWrapper(createContactController),
);
router.patch(
  '/:contactId',
  validateBody(updateContactsSchema),
  ctrlWrapper(updateContactController),
);
router.delete('/:contactId', ctrlWrapper(deleteContactController));

export default router;
