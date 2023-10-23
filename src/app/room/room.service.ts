import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { AuthService } from "../auth/auth.service";
import { Observable } from "rxjs";

@Injectable()
export class RoomService {

  private url = 'http://localhost:8000';
  private endpoint: string = 'v1/api/rooms';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {

  }

  list(): Observable<any[]> {
    const token = this.authService.getToken();

    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post<any>(`${this.url}/${this.endpoint}/`, {}, { headers: httpHeaders });
  }

  create(sufix: string) {
    const token = this.authService.getToken();

    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post<any>(`${this.url}/${this.endpoint}/create`, {
      name: `Room ${sufix}`
    }, { headers: httpHeaders });
  }
}