import { Component, OnInit } from '@angular/core';
import { NgModule }      from '@angular/core';

import { UserService } from '../user.service';
import { ChatService } from '../chat.service';
import { User } from '../user';


@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.css'],
  providers: [ChatService]
})
export class ChatMessagesComponent implements OnInit {
    
  constructor(
    
    private userService: UserService,
    private _chatService: ChatService) { 
      this._chatService.newUserJoined()
      .subscribe(data =>this.user.messages.push(data))

      this._chatService.newMessageRecieved()
      .subscribe(data =>this.user.messages.push(data))
  }

  messageText = '';
  user: User;

  ngOnInit() {
    // this.getUser();
    this.getUsers();
    setTimeout(() => this.join(), 1000);
    
  }

  getUsers(): void {
    this.userService.getUsers()
    .subscribe(users => this.user = users[1]);
  }

  /*getUser(): void {
    this.userService.getUser(11)
    .subscribe(user => this.user = user);
  }*/


  room = 'Bot';
  
  join(){
    this._chatService.joinRoom({user:this.user.name, room:this.room})
  }

  sendMessage(){
    console.log(this.messageText);
    this._chatService.sendMessage({user:this.user.name, room:this.room, message:this.messageText})
    this.messageText = '';
  }
  
}
