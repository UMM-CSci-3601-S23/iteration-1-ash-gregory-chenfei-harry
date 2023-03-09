import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClientRequest } from './client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  readonly requestUrl: string = `${environment.apiUrl}clients`;

  constructor(public myHttpClient: HttpClient) { }
  addRequest(newRequest: Partial<ClientRequest>): Observable<string> {
    // Send post request to add a new request with the user data as the body.
    return this.myHttpClient.post<{id: string}>(this.requestUrl, newRequest).pipe(map(res => res.id));
  }
}
