import { Component, OnInit, Input } from '@angular/core';
import { UserService }       from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
    
  @Input() user: User;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
       
  }
  
 
  
}
