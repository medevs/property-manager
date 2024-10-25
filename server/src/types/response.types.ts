import { PropertyAttributes } from './property.types';

export interface ApiResponse<T> {
  status: 'success' | 'error';
  message?: string;
  data?: T;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export type PropertyResponse = ApiResponse<PropertyAttributes>;
export type PropertiesResponse = PaginatedResponse<PropertyAttributes>;