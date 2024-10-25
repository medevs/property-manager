import { Router } from 'express';
import {
  createProperty,
  getProperties,
  getProperty,
  updateProperty,
  deleteProperty
} from '@/controllers/property.controller';

const router = Router();

router.route('/')
  .post(createProperty)
  .get(getProperties);

router.route('/:id')
  .get(getProperty)
  .patch(updateProperty)
  .delete(deleteProperty);

export default router;