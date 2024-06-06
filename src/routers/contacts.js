import { Router } from 'express';
import {
  getAllContacts,
  getContactByIdController,
  createContactController,
  updateContactController,
  deleteContactController,
} from '../controllers/contacts.js';

const router = Router();

export const ctrlWrapper = (ctrl) => {
  return (req, res, next) => {
    ctrl(req, res).catch(next);
  };
};

router.get('/', ctrlWrapper(getAllContacts));
router.get('/:contactId', ctrlWrapper(getContactByIdController));
router.post('/contacts', ctrlWrapper(createContactController));
router.patch('/contacts/:contactId', ctrlWrapper(updateContactController));
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

export default router;
