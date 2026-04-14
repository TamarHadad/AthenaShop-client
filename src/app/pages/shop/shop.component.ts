import { Component } from '@angular/core';
import { SHOES_DATA } from '../../data/shoes-data';
import { Shoe } from '../../models/shoe.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.less']
})
export class ShopComponent {
  selectedSort: string = 'popularity';
  selectedBrand: string = 'All';
  selectedSize: string = 'All';
  maxPrice: number = 1000;

  purchaseMessage: string = '';
  purchaseMessageType: 'success' | 'error' = 'success';

  selectedSizes: { [shoeId: number]: number | null } = {};

  shoes: Shoe[] = SHOES_DATA;

  constructor(private cartService: CartService) {}

  get filteredShoes(): Shoe[] {
    let result = [...this.shoes];

    if (this.selectedBrand !== 'All') {
      result = result.filter(shoe => shoe.brand === this.selectedBrand);
    }

    if (this.selectedSize !== 'All') {
      result = result.filter(shoe => shoe.size === +this.selectedSize);
    }

    result = result.filter(shoe => shoe.price <= this.maxPrice);

    if (this.selectedSort === 'lowToHigh') {
      result.sort((a, b) => a.price - b.price);
    } else if (this.selectedSort === 'highToLow') {
      result.sort((a, b) => b.price - a.price);
    } else {
      result.sort((a, b) => b.rank - a.rank);
    }

    return result;
  }

  clearFilters(): void {
    this.selectedBrand = 'All';
    this.selectedSize = 'All';
    this.maxPrice = 1000;
    this.selectedSort = 'popularity';
  }

  purchaseShoe(shoe: Shoe): void {
    const size = this.selectedSizes[shoe.id];

    if (!size) {
      this.purchaseMessageType = 'error';
      this.purchaseMessage = 'Please choose a size first';

      setTimeout(() => {
        this.purchaseMessage = '';
      }, 2500);
      return;
    }

    this.cartService.addItem(shoe, size);
    this.purchaseMessageType = 'success';
    this.purchaseMessage = `${shoe.name} added to cart!`;

    setTimeout(() => {
      this.purchaseMessage = '';
    }, 2500);
  }
}