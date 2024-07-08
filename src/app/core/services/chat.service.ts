// chat.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiUrl = 'http://localhost:1337/api'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  // Example method to send message to server
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
    }; // Adjust payload structure as per your API requirements
    return this.http.post<any>(`${this.apiUrl}/chats`, payload, {
      headers: headers,
    });
  }

  // Example method to fetch older chat messages
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
