import { Component, OnInit } from '@angular/core';

import { UserService } from "../services/user.service";

@Component({
  selector: 'user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  username: string = "default";

  constructor(userService: UserService) {
    this.username = userService.getUsername();
   }

  ngOnInit() {
  }

}
