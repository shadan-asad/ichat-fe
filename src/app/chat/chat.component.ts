// chat.component.ts

import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatService } from '../core/services/chat.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, AfterViewChecked {
  loggedInUser: string | null = 'User123'; // Replace with actual logged-in user's username
  messages: any[] = []; // Array to hold user messages
  serverMessages: any[] = []; // Array to hold server messages
  newMessage: string = ''; // Holds the new message from user input

  @ViewChild('chatBox') private chatBoxContainer!: ElementRef;

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.getUserDetails();
    this.fetchOlderMessages();
  }

  getUserDetails() {
    this.loggedInUser = localStorage.getItem('username');
  }

  fetchOlderMessages() {
    this.chatService.getOlderMessages().subscribe(
      (messages: any[]) => {
        console.log('msgs: ', messages);
        this.messages = messages;
        this.serverMessages = messages;
        setTimeout(() => this.scrollToBottom(), 0);
      },
      (error: any) => {
        console.error('Error fetching older messages:', error);
      }
    );
  }

  sendMessage() {
    if (this.newMessage.trim() === '') {
      return; // Don't send empty messages
    }

    // Send message to server
    this.chatService.sendMessage(this.newMessage).subscribe(
      (response: any) => {
        this.messages.push({ message: this.newMessage, from: 'user' });
        this.newMessage = ''; // Clear input field after sending

        this.serverMessages.push(response.attributes.message);
      },
      (error: any) => {
        console.error('Error sending message:', error);
      }
    );
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.chatBoxContainer.nativeElement.scrollTop = this.chatBoxContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }
}
