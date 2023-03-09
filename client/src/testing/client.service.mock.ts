import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { AppComponent } from 'src/app/app.component';
import { ClientRequest } from 'src/app/client/client';
import { ClientService } from 'src/app/client/client.service';
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
/* eslint @typescript-eslint/naming-convention: 'off' */
export class MockClientService extends ClientService {
  static testRequests: Request[] = [
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

  addRequest(newRequest: Partial<ClientRequest>): Observable<string> {
    // Send post request to add a new user with the user data as the body.
    return this.myHttpClient.post<{id: string}>(this.requestUrl, newRequest).pipe(map(res => res.id));
  }
}
