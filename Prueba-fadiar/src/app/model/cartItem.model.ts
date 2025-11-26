import { Product } from './products.model';

export interface CartItem {
  product: Product;
  quantity: number;
}
