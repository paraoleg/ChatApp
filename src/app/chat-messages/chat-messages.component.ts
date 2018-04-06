import { Component, OnInit, Input } from '@angular/core';
import { NgModule }      from '@angular/core';

import { ChatService } from '../chat.service';
import { User } from '../user';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.css'],
})


export class ChatMessagesComponent implements OnInit {
  
  @Input() currentUser: User;
  @Input() selectedUser: User;

  messageText = '';
  
  constructor(private _chatService: ChatService) { }
  
  ngOnInit() { }
  
  sendMessage(){
    let date = new Date().toLocaleString('en-US', { 
      hour: 'numeric', 
      minute: 'numeric',
      hour12: true 
    });
    this.messageText = this.messageText.trim();
    if (this.messageText){
    this.selectedUser.messages.push({
      author: this.currentUser.name, 
      text: this.messageText, 
      date: date
    });

    this._chatService.sendMessage({
      currentUserId: this.currentUser.id,
      currentUserName: this.currentUser.name,
      toid: this.selectedUser.id, 
      message: this.messageText,
      date: date
    });

    this.messageText = '';
  }}

  keyDownFunction(event) {
    if(event.keyCode == 13) {
      this.sendMessage();
    }
  }

  
}
