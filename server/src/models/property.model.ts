import { Schema, model } from 'mongoose';
import { PropertyDocument, Location } from '@/types/property.types';

const locationSchema = new Schema<Location>({
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true }
}, { _id: false });

const propertySchema = new Schema<PropertyDocument>({
  title: { 
    type: String, 
    required: [true, 'Property title is required'],
    trim: true
  },
  description: { 
    type: String, 
    required: [true, 'Property description is required'],
    trim: true
  },
  price: { 
    type: Number, 
    required: [true, 'Property price is required'],
    min: [0, 'Price cannot be negative']
  },
  location: { 
    type: locationSchema, 
    required: [true, 'Property location is required'] 
  },
  features: [{ 
    type: String,
    trim: true
  }],
  images: [{ 
    type: String,
    trim: true
  }],
  status: { 
    type: String, 
    enum: ['available', 'rented', 'maintenance'],
    default: 'available'
  }
}, {
  timestamps: true,
  toJSON: {
    transform: (_doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

const PropertyModel = model<PropertyDocument>('Property', propertySchema);

export default PropertyModel;