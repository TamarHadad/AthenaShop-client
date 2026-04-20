import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasicShoe } from '../../models/basic-shoe.model';
import { AuthService } from '../../services/auth.service';
import { ShoesService } from '../../services/shoes.service';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.less']
})
export class NewItemComponent implements OnInit {
  basicShoes: BasicShoe[] = [];
  selectedBasicShoe: BasicShoe | null = null;
  selectedSaleSize: number | null = null;
  addMessage: string = '';

  availableSizes: number[] = [
    3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5,
    7, 7.5, 8, 8.5, 9, 9.5, 10
  ];

  constructor(
    private authService: AuthService,
    private shoesService: ShoesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isManager()) {
      this.router.navigate(['/home']);
      return;
    }

    this.basicShoes = this.shoesService.getBasicShoes();
  }

  // selectBasicShoe(shoe: BasicShoe): void {
  //   this.selectedBasicShoe = shoe;
  //   this.selectedSaleSize = null;
  //   this.addMessage = '';
  // }

  selectBasicShoe(shoe: BasicShoe): void {
    this.selectedBasicShoe = shoe;
    this.selectedSaleSize = null;
    this.addMessage = '';
  
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  
  selectSize(size: number): void {
    this.selectedSaleSize = size;
  }

  addToSales(): void {
    if (!this.selectedBasicShoe || this.selectedSaleSize === null) {
      return;
    }

    this.shoesService.addShoeItemToSales(this.selectedBasicShoe, this.selectedSaleSize);

    this.addMessage = 'הפריט התווסף בהצלחה למכירות';
    this.selectedSaleSize = null;

    setTimeout(() => {
      this.addMessage = '';
    }, 2500);
  }
}