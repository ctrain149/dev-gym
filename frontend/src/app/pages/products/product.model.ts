export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string | null;
  category: string;
  active: boolean;
  createdAt: string | null;
  updatedAt: string | null;
}
