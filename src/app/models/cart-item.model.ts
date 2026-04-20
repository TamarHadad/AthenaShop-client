import { Shoe } from './shoe.model';

export interface CartItem {
  shoe: Shoe;
  selectedSize: number;
}