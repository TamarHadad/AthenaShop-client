import { Component } from '@angular/core';
import { SHOES_DATA } from '../../data/shoes-data';
import { Shoe } from '../../models/shoe.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent {

  shoes: Shoe[] = SHOES_DATA;

  newestShoe: Shoe = this.shoes[0];

  topPicks: Shoe[] = this.shoes.slice(0, 4);

  mostPopular: Shoe = this.shoes[0];

}