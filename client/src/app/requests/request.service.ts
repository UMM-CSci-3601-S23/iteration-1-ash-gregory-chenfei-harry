import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Request, FoodCategory } from './request';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  readonly requestUrl: string = `${environment.apiUrl}requests`;

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

  getRequests(filters?: { category?: FoodCategory; count?: number; unit?: string }): Observable<Request[]> {
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
    // That will return the desired `Observable<Request[]>`.
    return this.httpClient.get<Request[]>(this.requestUrl, {
      params: httpParams,
    });
  }

  /**
   * Get the `Request` with the specified ID.
   *
   * @param id the ID of the desired request
   * @returns an `Observable` containing the resulting request.
   */
  getRequestById(id: string): Observable<Request> {
    // The input to get could also be written as (this.requestUrl + '/' + id)
    return this.httpClient.get<Request>(`${this.requestUrl}/${id}`);
  }

  addRequest(newRequest: Partial<Request>): Observable<string> {
    // Send post request to add a new user with the user data as the body.
    return this.httpClient.post<{id: string}>(this.requestUrl, newRequest).pipe(map(res => res.id));
  }
}
