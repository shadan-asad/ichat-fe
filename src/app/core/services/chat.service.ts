import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiUrl = 'http://localhost:1337/api';

  constructor(private http: HttpClient) {}

  sendMessage(newMessage: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json',
    });

    const userId = localStorage.getItem('userid');
    console.log('mes: ', newMessage);
    console.log('user: ', userId);
    const payload = {
      data: {
        message: newMessage,
        user: userId,
      },
    };
    return this.http.post<any>(`${this.apiUrl}/chats`, payload, {
      headers: headers,
    });
  }

  getOlderMessages(): Observable<any[]> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json',
    });
    return this.http.get<any[]>(`${this.apiUrl}/chats`, {
      headers: headers,
    });
  }
}
