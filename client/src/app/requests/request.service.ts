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

  getRequests(): Observable<Request[]> {
    // Send the HTTP GET request with no parameters to get all requests.
    // That will return the desired `Observable<Request[]>`.
    return this.httpClient.get<Request[]>(this.requestUrl);
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
}
