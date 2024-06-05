import { Router } from 'express';
import {
  getAllContacts,
  getContactByIdController,
} from '../controllers/contacts.js';

const router = Router();

router.get('/contacts', getAllContacts);
router.get('/contacts/:contactId', getContactByIdController);

export default router;
