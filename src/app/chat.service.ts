import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs/Observable';
import { User } from './user';

@Injectable()
export class ChatService {

  private socket = io('http://localhost:3000');
  constructor() { }

  ngOnInit() {
    
  }
 
  joinRoom(data){
    this.socket.emit('join', data)
  }

  newUserJoined(){
    let observable =new Observable<{user:string, message:string}>(observer => {
      this.socket.on('new user joined', data => {
        observer.next(data);
      })
      return ()=>{this.socket.disconect();}
    })
  
    return observable;
  }

  sendMessage(data){
    this.socket.emit('message', data);
  }

  newMessageRecieved(){
    let observable = new Observable<{id: number, author:string, text:string, date: number}>(observer => {
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
      return ()=>{this.socket.disconect();}
    })
  
    return observable;
  }

  
}
