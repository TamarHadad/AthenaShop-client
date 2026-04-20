import { Component } from '@angular/core';
import { SHOES_DATA } from '../../data/shoes-data';
import { BasicShoe } from '../../models/basic-shoe.model';
import { CartItem } from '../../models/cart-item.model';
import { CartService } from '../../services/cart.service';
import { HistoryService } from '../../services/history.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.less']
})
export class CartComponent {
  topPicks: BasicShoe[] = SHOES_DATA.slice(0, 4);

  constructor(
    private cartService: CartService,
    private historyService: HistoryService,
    private router: Router
  ) {}

  get cartItems(): CartItem[] {
    return this.cartService.getItems();
  }

  get originalPrice(): number {
    return this.cartItems.reduce((sum, item) => sum + item.shoe.price, 0);
  }

  get delivery(): number {
    return this.cartItems.length > 0 ? 20 : 0;
  }

  get tax(): number {
    return +(this.originalPrice * 0.17).toFixed(2);
  }

  get total(): number {
    return +(this.originalPrice + this.delivery + this.tax).toFixed(2);
  }

  removeItem(item: CartItem): void {
    this.cartService.removeItem(item);
  }

  checkout(): void {
    if (this.cartItems.length === 0) {
      return;
    }

    this.historyService.addFromCart(this.cartItems);
    this.cartService.clearCart();
    this.router.navigate(['/history']);
  }
}