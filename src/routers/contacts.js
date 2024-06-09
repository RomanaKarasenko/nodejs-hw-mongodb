import { Router } from 'express';
import express from 'express';
import {
  getAllContacts,
  getContactByIdController,
  createContactController,
  updateContactController,
  deleteContactController,
} from '../controllers/contacts.js';

const router = Router();
const app = express();

app.use(express.json());

export const ctrlWrapper = (controller) => {
  return async (req, res, next) => {
      try {
          await controller(req, res, next);
      } catch (err) {
          next(err);
      }
  };
};

router.get('/contacts', ctrlWrapper(getAllContacts));
router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));
router.post('/contacts', ctrlWrapper(createContactController));
router.patch('/contacts/:contactId', ctrlWrapper(updateContactController));
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

export default router;
