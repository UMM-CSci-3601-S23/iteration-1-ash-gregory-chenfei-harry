import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Item, FoodCategory } from './item';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  readonly itemUrl: string = `${environment.apiUrl}items`;

  private readonly unitKey = 'unit';
  private readonly countKey = 'count';
  private readonly categoryKey = 'category';

  // The private `HttpClient` is *injected* into the service
  // by the Angular framework. This allows the system to create
  // only one `HttpClient` and share that across all services
  // that need it, and it allows us to inject a mock version
  // of `HttpClient` in the unit tests so they don't have to
  // make "real" HTTP calls to a server that might not exist or
  // might not be currently running.
  constructor(private httpClient: HttpClient) {
  }

  getItems(filters?: { category?: FoodCategory; count?: number; unit?: string }): Observable<Item[]> {
    // `HttpParams` is essentially just a map used to hold key-value
    // pairs that are then encoded as "?key1=value1&key2=value2&…" in
    // the URL when we make the call to `.get()` below.
    let httpParams: HttpParams = new HttpParams();
    if (filters) {
      if (filters.category) {
        httpParams = httpParams.set(this.categoryKey, filters.category);
      }
      if (filters.count) {
        httpParams = httpParams.set(this.countKey, filters.count.toString());
      }
      if (filters.unit) {
        httpParams = httpParams.set(this.unitKey, filters.unit);
      }
    }
    // Send the HTTP GET request with the given URL and parameters.
    // That will return the desired `Observable<Item[]>`.
    return this.httpClient.get<Item[]>(this.itemUrl, {
      params: httpParams,
    });
  }

  /**
   * Get the `Item` with the specified ID.
   *
   * @param id the ID of the desired item
   * @returns an `Observable` containing the resulting item.
   */
  getItemById(id: string): Observable<Item> {
    // The input to get could also be written as (this.itemUrl + '/' + id)
    return this.httpClient.get<Item>(`${this.itemUrl}/${id}`);
  }
}
