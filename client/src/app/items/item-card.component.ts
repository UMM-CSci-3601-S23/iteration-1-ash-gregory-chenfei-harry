import { Component, Input } from '@angular/core';
import { Item } from './item';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent {

  @Input() item: Item;
  @Input() simple?: boolean = false;
}
