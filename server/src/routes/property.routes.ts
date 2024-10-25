import { Router } from 'express';
import {
  createProperty,
  getProperties,
  getProperty,
  updateProperty,
  deleteProperty
} from '@/controllers/property.controller';
import { validate } from '@/middleware/validation.middleware';
import { createPropertySchema, updatePropertySchema, propertyQuerySchema } from '@/schemas/property.schema';

const router = Router();

router.route('/')
  .post(validate(createPropertySchema), createProperty)
  .get(validate(propertyQuerySchema), getProperties);

router.route('/:id')
  .get(getProperty)
  .patch(validate(updatePropertySchema), updateProperty)
  .delete(deleteProperty);

export default router;