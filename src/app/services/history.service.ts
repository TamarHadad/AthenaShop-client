import { Injectable } from '@angular/core';
import { HistoryItem } from '../models/history-item.model';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private historyItems: HistoryItem[] = [];

  constructor() {
    const savedHistory = localStorage.getItem('historyItems');
    if (savedHistory) {
      this.historyItems = JSON.parse(savedHistory);
    }
  }

  getItems(): HistoryItem[] {
    return this.historyItems;
  }

  addFromCart(cartItems: CartItem[]): void {
    const today = new Date();

    const purchaseDate = today.toLocaleDateString('en-GB');
    const purchaseDay = today.toLocaleDateString('en-US', { weekday: 'long' });

    const newHistoryItems: HistoryItem[] = cartItems.map(item => ({
      shoe: item.shoe,
      selectedSize: item.selectedSize,
      purchaseDate,
      purchaseDay
    }));

    this.historyItems = [...newHistoryItems, ...this.historyItems];
    this.saveHistory();
  }

  clearHistory(): void {
    this.historyItems = [];
    this.saveHistory();
  }

  private saveHistory(): void {
    localStorage.setItem('historyItems', JSON.stringify(this.historyItems));
  }
}