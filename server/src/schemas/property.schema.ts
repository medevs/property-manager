import { z } from 'zod';

const locationSchema = z.object({
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: z.string().min(1, 'Zip code is required')
});

export const createPropertySchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    price: z.number().min(0, 'Price cannot be negative'),
    location: locationSchema,
    features: z.array(z.string()).optional().default([]),
    images: z.array(z.string()).optional().default([]),
    status: z.enum(['available', 'rented', 'maintenance']).default('available')
  })
});

export const updatePropertySchema = createPropertySchema.deepPartial();

export const propertyQuerySchema = z.object({
  query: z.object({
    page: z.string().optional().default('1'),
    limit: z.string().optional().default('10'),
    sort: z.string().optional(),
    search: z.string().optional(),
    status: z.enum(['available', 'rented', 'maintenance']).optional(),
    minPrice: z.string().optional(),
    maxPrice: z.string().optional(),
    city: z.string().optional()
  })
});

export type CreatePropertySchema = z.infer<typeof createPropertySchema>['body'];
export type UpdatePropertySchema = z.infer<typeof updatePropertySchema>['body'];
export type PropertyQuerySchema = z.infer<typeof propertyQuerySchema>['query'];