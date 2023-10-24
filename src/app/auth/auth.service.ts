import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

export const TOKEN_NAME: string = 'jwt_token';

interface ILogin {
  User: any,
  Jwt: string
}

export abstract class BaseAuthService {
  abstract login(email: string, password: string): void;
  abstract signUp(username: string, email: string, password: string): void;
}

@Injectable()
export class AuthService implements BaseAuthService {

  private url = 'http://localhost:8000';
  private endpoint: string = 'v1/api/auth';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.url}/${this.endpoint}/login`, { email, password })
      .pipe(
        map((res) => {
          this.setToken(res["Jwt"])
          return res;
        })
      );
  }

  signUp(username: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.url}/${this.endpoint}/signup`, { username, email, password })
    .pipe(
      map((res) => {
        this.setToken(res["Jwt"])
        return res;
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_NAME);
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN_NAME, token);
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    const date = new Date(0);
    date.setUTCSeconds((decoded as any).exp);
    return date;
  }

  isTokenExpired(token?: string | null): boolean {
    if (!token) token = this.getToken();
    if (!token) return true;

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }
}