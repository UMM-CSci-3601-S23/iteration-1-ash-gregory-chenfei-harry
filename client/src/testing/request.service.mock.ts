import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { AppComponent } from 'src/app/app.component';
import { Request, FoodCategory } from 'src/app/requests/request';
import { RequestService } from 'src/app/requests/request.service';

/**
 * A 'mock' version of the `RequestService` that can be used to test components
 * without having to create an actual service. It needs to be `Injectable` since
 * that's how services are typically provided to components.
 */
@Injectable({
  providedIn: AppComponent
})
export class MockRequestService extends RequestService {
  static testRequests: Request[] = [
    {
      _id: '588935f5556f992bf8f37c01',
      name: 'Apples',
      category: 'fruits',
      unit: 'item',
      count: 32,
      price: 10.23,
      priority: 2,
      dateAdded: '2023-02-28T19:17:04Z',
      dateUpdated: '2023-02-28T19:17:04Z',
      countRemaining: 2
    },
    {
      _id: '588935f5556f992bf8f37c02',
      name: 'Jon',
      category: 'household',
      unit: 'cups',
      count: 100,
      price: 9.12,
      priority: 8,
      dateAdded: '2023-01-11T19:17:04Z',
      dateUpdated: '2023-01-11T19:17:04Z',
      countRemaining: 20}
  ];

  constructor() {
    super(null);
  }

  getRequests(filters?: { category?: FoodCategory; count?: number; unit?: string }): Observable<Request[]> {
    return of(MockRequestService.testRequests);
  }
}
