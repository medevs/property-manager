export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'agent' | 'client';
  createdAt: string;
  updatedAt: string;
}