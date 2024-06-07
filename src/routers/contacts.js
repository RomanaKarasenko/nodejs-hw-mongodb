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

router.get('/', ctrlWrapper(getAllContacts));
router.get('/:contactId', ctrlWrapper(getContactByIdController));
router.post('/', ctrlWrapper(createContactController));
router.patch('/:contactId', ctrlWrapper(updateContactController));
router.delete('/:contactId', ctrlWrapper(deleteContactController));

export default router;
