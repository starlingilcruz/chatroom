import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import jwt_decode from 'jwt-decode';

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
  private endpoint: string = 'v1/api/auth/login';
  private headers = new Headers({ 'Content-Type': 'application/json' });


  constructor(private http: HttpClient) { }

  getToken(): string | null {
    console.log("----getting token ", localStorage.getItem(TOKEN_NAME));
    return localStorage.getItem(TOKEN_NAME);
  }

  setToken(token: string): void {
    console.log("----setting token ", token);
    localStorage.setItem(TOKEN_NAME, token);
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    // if ((decoded as any).exp === undefined) return null;

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

  login(email: string, password: string): void {
    console.log(email)
    const headers = { 'Authorization': 'Bearer my-token' }
    this.http.post<any>(`${this.url}/${this.endpoint}`, { email, password })
      .subscribe(
        (data) => this.setToken(data["Jwt"])
      );
  }

  signUp(username: string, email: string, password: string): void {

  }
}