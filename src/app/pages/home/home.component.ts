import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SHOES_DATA } from '../../data/shoes-data';
import { BasicShoe } from '../../models/basic-shoe.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent {
  shoes: BasicShoe[] = SHOES_DATA;

  newestShoe: BasicShoe = this.shoes[0];
  topPicks: BasicShoe[] = this.shoes.slice(0, 4);
  mostPopular: BasicShoe = this.shoes[0];

  constructor(private router: Router) {}

  goToShop(): void {
    this.router.navigate(['/shop']);
  }
}