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

router.use('/contacts/:contactId', validateMongoId('contactId'));
router.get('/contacts', ctrlWrapper(getAllContacts));
router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));
router.post(
  '/contacts',
  validateBody(createContactsSchema),
  ctrlWrapper(createContactController),
);
router.patch(
  '/contacts/:contactId',
  validateBody(updateContactsSchema),
  ctrlWrapper(updateContactController),
);
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

export default router;
