import { Component, OnInit, Input } from '@angular/core';
import { UserService }       from '../user.service';
import { User } from '../user';

import { ChatService } from '../chat.service';

@Component({
  selector: 'app-user-select',
  templateUrl: './user-select.component.html',
  styleUrls: ['./user-select.component.css'],
  providers: [ChatService]
})
export class UserSelectComponent implements OnInit {
  @Input() users: User[];  
  @Input() tempUsers: User[];
  selectedUser: User;
  currentUser: User;

  constructor(private _chatService: ChatService) { 
    this._chatService.getUserData()
    .subscribe(data => this.users = data)

    this._chatService.getUserData()
    .subscribe(data => this.tempUsers = data)

    this._chatService.getUserData()
    .subscribe(data => this.selectedUser = data[0])

  }

  tabs: Array<{id: number, active: boolean, text: string}> = [{id: 1, active: true, text: 'Online'}, {id: 2, active: false, text: 'All'}];
  ngOnInit() {
    setTimeout(() => this.activateTab(1), 2000);
  }

  setSelectedUser(selectedUser: User){
    this.selectedUser = selectedUser;
  }

  
  textFormat(str: string) {
      return str.slice(0, 42) + "...";
  }

  onSearchUser(event: any) { 
    const value = event.target.value;
    this.users = this.tempUsers.filter(user => user.name.toLowerCase().includes(value.toLowerCase()));
  }

  activateTab(id: number) {
    this.tabs.map(tab => {
      const activeTab = (tab.id === id);
      if (activeTab) {
        switch (tab.text){
          case "Online": 
            this.users = this.tempUsers.filter(user => user.status);
            break;
          case "All":
            this.users = this.tempUsers;
            break;
          default: 
            this.users = this.tempUsers;
            break;
        }
      }
      tab.active = activeTab;
      return tab;
    });

  
  }


}
