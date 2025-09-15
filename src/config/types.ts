export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  company: string;
  description: string;
  offer: number;
  available: number;
  isFavorite: boolean;
}

export interface Offer {
  id: number;
  product: number;
  image: string;
  company: string;
}

export interface Company {
  id: number;
  name: string;
  image: string;
  soon: number;
}

export interface Category {
  id: number;
  name: string;
  image: string;
  number_of_products?: number;
}

export interface CartProduct {
  id: number;
  quantity: number;
  name: string;
  image: string;
  price: number;
  with_coins: boolean;
}

export interface discount {
  code: string;
  value: number;
}

export interface OrderProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  with_coins: boolean;
}

export interface Order {
  id: string;
  created_at: string;
  method: string;
  city: string;
  discount: string;
  delivered: number;
  processing: number;
  total: number;
  products: OrderProduct[];
}
