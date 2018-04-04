import { Component, OnInit, Input } from '@angular/core';
import { NgModule }      from '@angular/core';

import { ChatService } from '../chat.service';
import { User } from '../user';


@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.css'],
  //providers: [ChatService]
})
export class ChatMessagesComponent implements OnInit {
  

  @Input() selectedUser: User;
  messageText = '';
  @Input() currentUser: User;


  constructor(private _chatService: ChatService) { 
      this._chatService.getUserData()
      .subscribe(data => this.currentUser = data[data.length-1])
      
      this._chatService.newUserJoined()
      .subscribe(data => this.selectedUser.messages.push(data))

      this._chatService.newMessageRecieved()
      .subscribe(data => {
        console.log(data);
        if (data.author == this.selectedUser.name){
          console.log(data.author, this.selectedUser.name)
          this.selectedUser.messages.push(data);
        }
      })
      
      
  }
  

  ngOnInit() {
    setTimeout(() => {
      this.join();
    }, 1000);

    
  }
  
  room = 'Bot';
  
  join(){
    this._chatService.joinRoom({user:this.currentUser.name, room:this.currentUser.id});
  }

  sendMessage(){
    this.selectedUser.messages.push({author: this.currentUser.name, text: this.messageText, date: Date.now()})
    console.log(this.messageText);

    this._chatService.sendMessage({
      currentUserId: this.currentUser.id,
      toid: this.selectedUser.id, 
      currentUsername: this.currentUser.name, 
      room: this.room, 
      message: this.messageText,
      data: Date.now()
    });

    this.messageText = '';
  }
  
}
