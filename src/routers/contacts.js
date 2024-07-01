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
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

const contactsRouter = Router();

export const ctrlWrapper = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

contactsRouter.use(authenticate);
contactsRouter.use('/:contactId', validateMongoId('contactId'));
contactsRouter.get('/', ctrlWrapper(getAllContacts));
contactsRouter.get('/:contactId', ctrlWrapper(getContactByIdController));
contactsRouter.post(
  '/',
  //upload.single('photo'),
  validateBody(createContactsSchema),
  upload.single('photo'),
  ctrlWrapper(createContactController),
);
contactsRouter.patch(
  '/:contactId',
  upload.single('photo'),
  validateBody(updateContactsSchema),
  //upload.single('photo'),
  ctrlWrapper(updateContactController),
);
contactsRouter.delete('/:contactId', ctrlWrapper(deleteContactController));

export default contactsRouter;
