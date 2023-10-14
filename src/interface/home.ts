export interface RangePrice {
  minPrice?: number;
  maxPrice?: number;
}

export interface QueryParams {
  page?: number;
  take?: number;
  minPrice?: string;
  maxPrice?: string;
  categoryId?: string;
  q?: string;
  order?: string;
  orderField?: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  discountPercentage: number;
  rating: number;
  brand: string;
  categoryId: string;
  category: Category;
  thumbnail: string;
  images: string[];
}
