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
      const parsedCart = JSON.parse(savedCart);

      this.cartItems = parsedCart.filter((item: any) => item.shoe && item.selectedSize);
    }
  }

  getItems(): CartItem[] {
    return this.cartItems;
  }

  addItem(shoe: Shoe, selectedSize: number): void {
    this.cartItems.push({ shoe, selectedSize });
    this.saveCart();
  }

  removeItem(itemToRemove: CartItem): void {
    this.cartItems = this.cartItems.filter(
      item =>
        !(
          item.shoe.id === itemToRemove.shoe.id &&
          item.selectedSize === itemToRemove.selectedSize
        )
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