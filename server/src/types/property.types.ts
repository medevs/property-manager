import { Document } from 'mongoose';

export interface Location {
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface PropertyAttributes {
  title: string;
  description: string;
  price: number;
  location: Location;
  features: string[];
  images: string[];
  status: 'available' | 'rented' | 'maintenance';
  createdAt: Date;
  updatedAt: Date;
}

export interface PropertyDocument extends Document {
  title: string;
  description: string;
  price: number;
  location: Location;
  features: string[];
  images: string[];
  status: 'available' | 'rented' | 'maintenance';
  createdAt: Date;
  updatedAt: Date;
}