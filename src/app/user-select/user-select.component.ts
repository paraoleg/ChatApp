import { Component, OnInit } from '@angular/core';
import { UserService }       from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-user-select',
  templateUrl: './user-select.component.html',
  styleUrls: ['./user-select.component.css']
})
export class UserSelectComponent implements OnInit {
  users: User[];  
  tempUsers: User[];
  selectedUserId: number;
  constructor(private userService: UserService) { }

  tabs: Array<{id: number, active: boolean, text: string}>= [{id: 1, active: true, text: 'Online'}, {id: 2, active: false, text: 'All'}];
  ngOnInit() {
    this.getUsers();
    setTimeout(() => this.activateTab(1), 1000);
  }

  getUsers(): void {
    this.userService.getUsers()
    .subscribe(users => this.users = users);
    this.userService.getUsers()
    .subscribe(users => this.tempUsers = users);
    
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
