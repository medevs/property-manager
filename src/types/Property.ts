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