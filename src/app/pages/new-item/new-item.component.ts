import { Component } from '@angular/core';
import { SHOES_DATA } from '../../data/shoes-data';
import { Shoe } from '../../models/shoe.model';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.less']
})
export class NewItemComponent {
  shoes: Shoe[] = SHOES_DATA;
  selectedShoe: Shoe = this.shoes[0];

  selectShoe(shoe: Shoe): void {
    this.selectedShoe = shoe;
  }
}