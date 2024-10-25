import { Property } from '@/types/property.types';
import { mockProperties } from './mockData';

class PropertyService {
  private properties: Property[] = [...mockProperties];

  async getProperties(): Promise<Property[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return this.properties;
  }

  async getProperty(id: string): Promise<Property | undefined> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.properties.find(property => property.id === id);
  }

  async createProperty(propertyData: Partial<Property>): Promise<Property> {
    await new Promise(resolve => setTimeout(resolve, 800));

    const newProperty: Property = {
      id: crypto.randomUUID(), // Generate random ID
      title: propertyData.title || '',
      description: propertyData.description || '',
      price: propertyData.price || 0,
      location: propertyData.location || {
        address: '',
        city: '',
        state: '',
        zipCode: ''
      },
      features: propertyData.features || [],
      images: propertyData.images || [],
      status: propertyData.status || 'available',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.properties.push(newProperty);
    return newProperty;
  }

  async updateProperty(id: string, propertyData: Partial<Property>): Promise<Property> {
    await new Promise(resolve => setTimeout(resolve, 800));

    const propertyIndex = this.properties.findIndex(p => p.id === id);
    if (propertyIndex === -1) {
      throw new Error('Property not found');
    }

    const updatedProperty: Property = {
      ...this.properties[propertyIndex],
      ...propertyData,
      updatedAt: new Date().toISOString()
    };

    this.properties[propertyIndex] = updatedProperty;
    return updatedProperty;
  }
}

export const propertyService = new PropertyService();