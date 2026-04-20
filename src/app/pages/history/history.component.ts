import { Component } from '@angular/core';
import { HistoryItem } from '../../models/history-item.model';
import { HistoryService } from '../../services/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.less']
})
export class HistoryComponent {
  constructor(private historyService: HistoryService) {}

  get historyItems(): HistoryItem[] {
    return this.historyService.getItems();
  }

  get totalItems(): number {
    return this.historyItems.length;
  }

  get totalPrice(): number {
    return this.historyItems.reduce((sum, item) => sum + item.shoe.price, 0);
  }
}