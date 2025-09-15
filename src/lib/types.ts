export interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  company: string;
  price: number;
  image: string;
  in_coin_store: number;
  available: number;
  offer: number;
}

interface discount {
  code: string;
  value: number;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  spare_phone: string;
  coins: number;
  street: string;
  building: string;
  floor: string;
  created_at: string;
}

interface OrderProduct {
  name: string;
  quantity: number;
  price_at_order: number;
}

export interface Order {
  id: string;
  user: string;
  delivered: boolean;
  processing: boolean;
  discount: discount;
  city: string;
  phone: string;
  spare_phone: string;
  street: string;
  building: string;
  floor: string;
  method: string;
  total: number;
  created_at: string;
  paymob_paid: boolean;
  products: OrderProduct[];
}

export interface Company {
  id: number;
  name: string;
  image: string;
  soon: boolean;
}

export interface Category {
  id: number;
  name: string;
}

export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
  seen: boolean;
}

export interface Offer {
  id: number;
  image: string;
  company: string | null;
}

export interface Admin {
  username: string;
  login_at: string;
}

export interface Delivery {
  id: number;
  city: string;
  value: number;
  hidden: number;
}
