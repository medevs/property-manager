import { Property } from '@/types/property.types';
import { mockProperties } from './mockData';

class PropertyService {
  async getProperties(): Promise<Property[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockProperties;
  }

  async getProperty(id: string): Promise<Property | undefined> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockProperties.find(property => property.id === id);
  }
}

export const propertyService = new PropertyService();