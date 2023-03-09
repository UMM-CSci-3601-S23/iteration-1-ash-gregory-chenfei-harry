import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(public myHttpClient: HttpClient) { }
  addRequest(newRequest: Partial<Request>): Observable<string> {
    // Send post request to add a new user with the user data as the body.
    return this.myHttpClient.post<{id: string}>(this.requestUrl, newRequest).pipe(map(res => res.id));
  }
}
