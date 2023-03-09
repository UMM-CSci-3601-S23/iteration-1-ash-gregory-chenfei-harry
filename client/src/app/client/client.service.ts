import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  readonly requestUrl: string = `${environment.apiUrl}requests`;
  constructor(public myHttpClient: HttpClient) { }
  addRequest(newRequest: Partial<Request>): Observable<string> {
    // Send post request to add a new user with the user data as the body.
    return this.myHttpClient.post<{id: string}>(this.requestUrl, newRequest).pipe(map(res => res.id));
  }
}
