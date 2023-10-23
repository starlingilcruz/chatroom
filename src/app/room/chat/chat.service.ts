import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { AuthService } from "../../auth/auth.service";


@Injectable()
export class ChatService {

  private url = 'http://localhost:8000';
  private wsUrl = 'ws://localhost:8000';
  private endpoint: string = 'v1/api/rooms';

  private ws: any;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
  }

  initWebsocket(roomId: number = 0, broadCast: (b: any) => any ) {
    const token = this.authService.getToken();
    
    // TODO support room isolation
    this.ws = new WebSocket(`${this.wsUrl}/v1/ws?token=${token}`);

    this.ws.onopen = function () {
      console.log("The connection was setup successfully !");
    };
  
    this.ws.onclose = function () {
      console.log("Something unexpected happened !");
    };

    this.ws.onmessage = function (e: any) {
      const data = JSON.parse(e.data);
      console.log("---message received:", data);
      broadCast(data);
    };
  }

  listMessages(roomId: number): Observable<any[]> {
    const token = this.authService.getToken();

    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post<any>(
      `${this.url}/${this.endpoint}/${roomId}/messages`, {}, { headers: httpHeaders }
    );
  }

  sendMesasges(message: string, roomId: number) {
    this.ws.send(JSON.stringify({ message, roomId }));
  }
}