import { Property } from '@/types/property.types';

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Downtown Apartment',
    description: 'Luxurious 2-bedroom apartment in the heart of downtown',
    price: 250000,
    location: {
      address: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001'
    },
    features: ['2 Bedrooms', '2 Bathrooms', 'Parking', 'Pool'],
    images: ['/api/placeholder/400/200'],
    status: 'available',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Suburban Family Home',
    description: 'Spacious 4-bedroom house with large backyard',
    price: 450000,
    location: {
      address: '456 Oak Avenue',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001'
    },
    features: ['4 Bedrooms', '3 Bathrooms', 'Garden', 'Garage'],
    images: ['/api/placeholder/400/200'],
    status: 'available',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];