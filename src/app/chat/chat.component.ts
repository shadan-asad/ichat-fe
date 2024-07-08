import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
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
  loggedInUser: string | null = 'User123';
  combinedMessages: any[] = [];
  newMessage: string = '';

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
        this.combinedMessages = messages.flatMap((msg, index) => [
          { message: msg.message, from: 'user' },
          { message: msg.message, from: 'server' },
        ]);
        setTimeout(() => this.scrollToBottom(), 0);
      },
      (error: any) => {
        console.error('Error fetching older messages:', error);
      }
    );
  }

  sendMessage() {
    if (this.newMessage.trim() === '') {
      return;
    }

    this.chatService.sendMessage(this.newMessage).subscribe(
      (response: any) => {
        console.log('chat res: ', response.data);
        this.combinedMessages.push({ message: this.newMessage, from: 'user' });
        this.combinedMessages.push({
          message: response.data.attributes.message,
          from: 'server',
        });
        this.newMessage = '';
        setTimeout(() => this.scrollToBottom(), 0);
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
      this.chatBoxContainer.nativeElement.scrollTop =
        this.chatBoxContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }
}
