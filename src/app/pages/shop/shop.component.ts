import { Component, OnInit } from '@angular/core';
import { Shoe } from '../../models/shoe.model';
import { ShoeItem } from '../../models/shoe-item.model';
import { CartService } from '../../services/cart.service';
import { ShoesService } from '../../services/shoes.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.less']
})
export class ShopComponent implements OnInit {
  shoes: ShoeItem[] = [];

  selectedSort: string = 'popularity';
  selectedSizeFilter: number | null = null;
  selectedPriceMin: number = 0;
  selectedPriceMax: number = 1000;

  selectedBrands: { [brand: string]: boolean } = {
    Adidas: false,
    Nike: false,
    Puma: false,
    'Off-White': false
  };

  purchaseMessage: string = '';
  purchaseMessageType: 'success' | 'error' = 'success';

  readonly availableFilterSizes: number[] = [
    3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5,
    7, 7.5, 8, 8.5, 9, 9.5, 10
  ];

  readonly brands: string[] = ['Adidas', 'Nike', 'Puma', 'Off-White'];

  constructor(
    private cartService: CartService,
    private shoesService: ShoesService
  ) {}

  ngOnInit(): void {
    this.shoes = this.shoesService.getSaleShoes();
  }

  get filteredShoes(): ShoeItem[] {
    let result = [...this.shoes];

    const activeBrands = this.getSelectedBrands();

    if (activeBrands.length) {
      result = result.filter(item => activeBrands.includes(item.basicShoe.brand));
    }

    if (this.selectedSizeFilter !== null) {
      result = result.filter(item => item.size === this.selectedSizeFilter);
    }

    result = result.filter(
      item =>
        item.basicShoe.price >= this.selectedPriceMin &&
        item.basicShoe.price <= this.selectedPriceMax
    );

    if (this.selectedSort === 'lowToHigh') {
      result.sort((a, b) => a.basicShoe.price - b.basicShoe.price);
    } else if (this.selectedSort === 'highToLow') {
      result.sort((a, b) => b.basicShoe.price - a.basicShoe.price);
    } else {
      result.sort((a, b) => b.basicShoe.rank - a.basicShoe.rank);
    }

    return result;
  }

  toggleSizeFilter(size: number): void {
    this.selectedSizeFilter = this.selectedSizeFilter === size ? null : size;
  }

  toggleBrand(brand: string): void {
    this.selectedBrands[brand] = !this.selectedBrands[brand];
  }

  purchaseShoe(item: ShoeItem): void {
    const shoeForCart: Shoe = {
      id: item.id,
      name: item.basicShoe.name,
      brand: item.basicShoe.brand,
      model: item.basicShoe.model,
      price: item.basicShoe.price,
      rank: item.basicShoe.rank,
      size: item.size,
      image: item.basicShoe.image
    };

    this.cartService.addItem(shoeForCart, item.size);

    this.purchaseMessageType = 'success';
    this.purchaseMessage = `${item.basicShoe.name} added to cart!`;

    setTimeout(() => {
      this.purchaseMessage = '';
    }, 2500);
  }

  clearAllFilters(): void {
    this.selectedSizeFilter = null;
    this.selectedPriceMin = 0;
    this.selectedPriceMax = 1000;
    this.selectedSort = 'popularity';

    this.brands.forEach(brand => {
      this.selectedBrands[brand] = false;
    });
  }

  removeBrandFilter(brand: string): void {
    this.selectedBrands[brand] = false;
  }

  clearSizeFilter(): void {
    this.selectedSizeFilter = null;
  }

  clearPriceFilter(): void {
    this.selectedPriceMin = 0;
    this.selectedPriceMax = 1000;
  }

  getSelectedBrands(): string[] {
    return this.brands.filter(brand => this.selectedBrands[brand]);
  }

  getBrandCount(brand: string): number {
    return this.shoes.filter(item => item.basicShoe.brand === brand).length;
  }
}