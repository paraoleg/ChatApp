import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs/Observable';
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
    let observable = new Observable<{user:string, message:string}>(observer => {
      this.socket.on('new message', data => {
        observer.next(data);
      })
      return ()=>{this.socket.disconect();}
    })
  
    return observable;
  }

  


}
