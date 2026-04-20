import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BasicShoe } from '../../models/basic-shoe.model';

@Component({
  selector: 'app-shoe-card',
  templateUrl: './shoe-card.component.html',
  styleUrls: ['./shoe-card.component.less']
})
export class ShoeCardComponent {
  @Input() shoe!: BasicShoe;
  @Input() buttonText: string = 'Add';
  @Input() showButton: boolean = true;

  @Output() buttonClicked = new EventEmitter<BasicShoe>();

  onButtonClick(): void {
    this.buttonClicked.emit(this.shoe);
  }
}