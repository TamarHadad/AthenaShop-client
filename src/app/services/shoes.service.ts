import { Injectable } from '@angular/core';
import { BasicShoe } from '../models/basic-shoe.model';
import { ShoeItem } from '../models/shoe-item.model';
import { SHOES_DATA } from '../data/shoes-data';

@Injectable({
  providedIn: 'root'
})
export class ShoesService {
  private basicShoesKey = 'basicShoes';
  private saleShoesKey = 'saleShoes';

  constructor() {
    this.initializeStorage();
  }

  private initializeStorage(): void {
    const savedBasicShoes = localStorage.getItem(this.basicShoesKey);
    const savedSaleShoes = localStorage.getItem(this.saleShoesKey);

    if (!savedBasicShoes) {
      localStorage.setItem(this.basicShoesKey, JSON.stringify(SHOES_DATA));
    }

    if (!savedSaleShoes) {
      const initialSaleShoes = this.buildInitialSaleShoes(SHOES_DATA);
      localStorage.setItem(this.saleShoesKey, JSON.stringify(initialSaleShoes));
    }
  }

  private buildInitialSaleShoes(basicShoes: BasicShoe[]): ShoeItem[] {
    return basicShoes.map((basicShoe, index) => ({
      id: index + 1,
      basicShoe,
      size: this.getInitialSizeByIndex(index)
    }));
  }

  private getInitialSizeByIndex(index: number): number {
    const sizePattern: number[] = [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10];
    return sizePattern[index % sizePattern.length];
  }

  getBasicShoes(): BasicShoe[] {
    const savedBasicShoes = localStorage.getItem(this.basicShoesKey);
    return savedBasicShoes ? JSON.parse(savedBasicShoes) : [];
  }

  getSaleShoes(): ShoeItem[] {
    const savedSaleShoes = localStorage.getItem(this.saleShoesKey);
    return savedSaleShoes ? JSON.parse(savedSaleShoes) : [];
  }

  addShoeItemToSales(basicShoe: BasicShoe, size: number): void {
    const saleShoes = this.getSaleShoes();

    const alreadyExists = saleShoes.some(
      item =>
        item.basicShoe.brand === basicShoe.brand &&
        item.basicShoe.model === basicShoe.model &&
        item.size === size
    );

    if (alreadyExists) {
      return;
    }

    const newItem: ShoeItem = {
      id: this.getNextSaleItemId(),
      basicShoe,
      size
    };

    saleShoes.push(newItem);
    localStorage.setItem(this.saleShoesKey, JSON.stringify(saleShoes));
  }

  getNextSaleItemId(): number {
    const saleShoes = this.getSaleShoes();

    if (!saleShoes.length) {
      return 1;
    }

    return Math.max(...saleShoes.map(item => item.id)) + 1;
  }
}