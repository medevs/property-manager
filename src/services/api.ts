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

// const API_BASE_URL = 'http://localhost:3001/api';

// class PropertyService {
//   private async fetchWithErrorHandling<T>(url: string, options?: RequestInit): Promise<T> {
//     const response = await fetch(url, options);
//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || 'An error occurred');
//     }
//     return response.json() as Promise<T>;
//   }

//   async getProperties(): Promise<Property[]> {
//     return this.fetchWithErrorHandling<Property[]>(`${API_BASE_URL}/properties`);
//   }

//   async getProperty(id: string): Promise<Property> {
//     return this.fetchWithErrorHandling<Property>(`${API_BASE_URL}/properties/${id}`);
//   }

//   async createProperty(propertyData: Partial<Property>): Promise<Property> {
//     return this.fetchWithErrorHandling<Property>(`${API_BASE_URL}/properties`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(propertyData),
//     });
//   }

//   async updateProperty(id: string, propertyData: Partial<Property>): Promise<Property> {
//     return this.fetchWithErrorHandling<Property>(`${API_BASE_URL}/properties/${id}`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(propertyData),
//     });
//   }

//   async deleteProperty(id: string): Promise<void> {
//     await this.fetchWithErrorHandling<void>(`${API_BASE_URL}/properties/${id}`, {
//       method: 'DELETE',
//     });
//   }
// }

// export const propertyService = new PropertyService();
