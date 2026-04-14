import { Shoe } from './shoe.model';

export interface HistoryItem {
  shoe: Shoe;
  selectedSize: number;
  purchaseDate: string;
  purchaseDay: string;
}