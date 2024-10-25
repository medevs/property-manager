import { FilterQuery } from 'mongoose';
import { PropertyQuerySchema } from '@/schemas/property.schema';
import { PropertyDocument } from '@/types/property.types';

interface QueryResult {
  filter: FilterQuery<PropertyDocument>;
  sort: string;
  page: number;
  limit: number;
}

export const buildPropertyQuery = (queryParams: PropertyQuerySchema): QueryResult => {
  const filter: FilterQuery<PropertyDocument> = {};

  // Search in title and description
  if (queryParams.search) {
    filter.$or = [
      { title: { $regex: queryParams.search, $options: 'i' } },
      { description: { $regex: queryParams.search, $options: 'i' } }
    ];
  }

  // Filter by status
  if (queryParams.status) {
    filter.status = queryParams.status;
  }

  // Filter by city
  if (queryParams.city) {
    filter['location.city'] = { $regex: queryParams.city, $options: 'i' };
  }

  // Price range
  if (queryParams.minPrice || queryParams.maxPrice) {
    filter.price = {};
    if (queryParams.minPrice) {
      filter.price.$gte = parseFloat(queryParams.minPrice);
    }
    if (queryParams.maxPrice) {
      filter.price.$lte = parseFloat(queryParams.maxPrice);
    }
  }

  // Sorting
  const sort = queryParams.sort || '-createdAt';

  // Pagination
  const page = parseInt(queryParams.page || '1');
  const limit = parseInt(queryParams.limit || '10');

  return { filter, sort, page, limit };
};