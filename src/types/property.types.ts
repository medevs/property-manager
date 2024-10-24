export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  features: string[];
  images: string[];
  status: 'available' | 'rented' | 'maintenance';
  createdAt: string;
  updatedAt: string;
}

export interface PropertyState {
  properties: Property[];
  selectedProperty: Property | null;
  loading: boolean;
  error: string | null;
  filters: {
    status: string[];
    priceRange: {
      min: number;
      max: number;
    };
    location: string;
  };
}