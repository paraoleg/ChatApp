import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs/Observable';
import { User } from './user';

@Injectable()
export class ChatService {

  private socket = io('http://localhost:3000');
  constructor() { }

  ngOnInit() { }
 
  joinRoom(data){
    this.socket.emit('join', data)
  }

  sendMessage(data){
    this.socket.emit('message', data);
  }

  newMessageRecieved(){
    let observable = new Observable<{id: number, author:string, text:string, date: string}>(observer => {
      this.socket.on('new message', data => {
        observer.next(data);
      })
      return ()=>{this.socket.disconect();}
    })
  
    return observable;
  }

  getUserData(){
    let observable = new Observable<User[]>(observer => {
      this.socket.on('userData', data => {
        observer.next(data);
      })
      return () => {this.socket.disconect();}
    })
  
    return observable;
  }

  getCurrentUser(){
    let observable = new Observable<User>(observer => {
      this.socket.on('currentUser', data => {
        observer.next(data);
      })
      return ()=>{this.socket.disconect();}
    })
  
    return observable;
  }
  
}
