import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { Shoe } from '../models/shoe.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];

  constructor() {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
    }
  }

  getItems(): CartItem[] {
    return this.cartItems;
  }

  addItem(shoe: Shoe, selectedSize: number): void {
    const alreadyExists = this.cartItems.some(
      item => item.shoe.id === shoe.id
    );

    if (alreadyExists) {
      return;
    }

    this.cartItems.push({ shoe, selectedSize });
    this.saveCart();
  }

  removeItem(itemToRemove: CartItem): void {
    this.cartItems = this.cartItems.filter(
      item => item.shoe.id !== itemToRemove.shoe.id
    );

    this.saveCart();
  }

  clearCart(): void {
    this.cartItems = [];
    this.saveCart();
  }

  private saveCart(): void {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }
}