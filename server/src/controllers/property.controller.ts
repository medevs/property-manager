import { Request, Response, NextFunction } from 'express';
import PropertyModel from '@/models/property.model';
import { PropertyAttributes } from '@/types/property.types';
import { NotFoundError } from '@/utils/custom-error';
import { PropertyResponse, PropertiesResponse, ApiResponse } from '@/types/response.types';

interface RequestParams {
  id?: string;
}

interface RequestQuery {
  page?: string;
  limit?: string;
}

export const createProperty = async (
  req: Request<RequestParams, PropertyResponse, PropertyAttributes>,
  res: Response<PropertyResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const property = await PropertyModel.create(req.body);
    
    res.status(201).json({
      status: 'success',
      message: 'Property created successfully',
      data: property.toJSON()
    });
  } catch (error) {
    next(error);
  }
};

export const getProperties = async (
  req: Request<RequestParams, PropertiesResponse, object, RequestQuery>,
  res: Response<PropertiesResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const page = parseInt(req.query.page || '1');
    const limit = parseInt(req.query.limit || '10');
    const skip = (page - 1) * limit;

    const [properties, total] = await Promise.all([
      PropertyModel.find()
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      PropertyModel.countDocuments()
    ]);

    res.status(200).json({
      status: 'success',
      data: properties.map(p => p.toJSON()),
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getProperty = async (
  req: Request<RequestParams>,
  res: Response<PropertyResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const property = await PropertyModel.findById(req.params.id);
    
    if (!property) {
      throw new NotFoundError('Property not found');
    }

    res.status(200).json({
      status: 'success',
      data: property.toJSON()
    });
  } catch (error) {
    next(error);
  }
};

export const updateProperty = async (
  req: Request<RequestParams, PropertyResponse, Partial<PropertyAttributes>>,
  res: Response<PropertyResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const property = await PropertyModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!property) {
      throw new NotFoundError('Property not found');
    }

    res.status(200).json({
      status: 'success',
      message: 'Property updated successfully',
      data: property.toJSON()
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProperty = async (
  req: Request<RequestParams>,
  res: Response<ApiResponse<null>>,
  next: NextFunction
): Promise<void> => {
  try {
    const property = await PropertyModel.findByIdAndDelete(req.params.id);

    if (!property) {
      throw new NotFoundError('Property not found');
    }

    res.status(200).json({
      status: 'success',
      message: 'Property deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};