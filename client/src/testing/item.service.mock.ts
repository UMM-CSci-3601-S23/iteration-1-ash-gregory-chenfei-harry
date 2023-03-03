import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { AppComponent } from 'src/app/app.component';
import { Item, FoodCategory } from 'src/app/items/item';
import { ItemService } from 'src/app/items/item.service';

/**
 * A 'mock' version of the `ItemService` that can be used to test components
 * without having to create an actual service. It needs to be `Injectable` since
 * that's how services are typically provided to components.
 */
@Injectable({
  providedIn: AppComponent
})
/* eslint @typescript-eslint/naming-convention: 'off' */
export class MockItemService extends ItemService {
  static testItems: Item[] = [
    {
      _id: '588935f5556f992bf8f37c01',
      name: 'Apples',
      category: 'fruits',
      unit: 'item',
      count: 32,
      price: 10.23,
      priority: 2,
      date_added: '2023-02-28T19:17:04Z',
      date_updated: '2023-02-28T19:17:04Z',
      count_remaining: 2
    },
    {
      _id: '588935f5556f992bf8f37c02',
      name: 'Jon',
      category: 'household',
      unit: 'cups',
      count: 100,
      price: 9.12,
      priority: 8,
      date_added: '2023-01-11T19:17:04Z',
      date_updated: '2023-01-11T19:17:04Z',
      count_remaining: 20}
  ];

  constructor() {
    super(null);
  }

  getItems(filters?: { category?: FoodCategory; count?: number; unit?: string }): Observable<Item[]> {
    return of(MockItemService.testItems);
  }
}
