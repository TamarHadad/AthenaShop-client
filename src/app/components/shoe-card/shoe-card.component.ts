import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Shoe } from '../../models/shoe.model';

@Component({
  selector: 'app-shoe-card',
  templateUrl: './shoe-card.component.html',
  styleUrls: ['./shoe-card.component.less']
})
export class ShoeCardComponent {
  @Input() shoe!: Shoe;
  @Input() buttonText: string = 'Purchase';
  @Input() showButton: boolean = true;

  @Output() buttonClicked = new EventEmitter<Shoe>();

  onButtonClick(): void {
    this.buttonClicked.emit(this.shoe);
  }
}