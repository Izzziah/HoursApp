import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { UserService } from "../services/user.service";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private username: string;
  private password: string;
  errorMsg: string = '';
  private isBusy = false;
  private userId;
  
  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  login(username, password) {
    if (this.legalLogin(username, password) != 0) {
      this.loginError(null);
      console.error('empty field');
    }
    else {
      this.isBusy = true;
      this.errorMsg = null;
      try {
        this.userService.login(username, password).subscribe(
          data => {
            // console.log(data);
            this.loginSuccess(data);
          },
          err => this.loginError(<any>err)
        );
      }
      catch (ex) {
        console.error('Error loggin in ' + ex);
      }
    }
  }

  private loginSuccess(data) {
    this.isBusy = false;
    this.userId = data['UserId'];
    // Navigate to user home page
    this.router.navigate([this.userId + '/user-home']);
  }

  private loginError(err) {
    let errorMsg = 'Unable to login :(';
    if (err instanceof Response) {
      let resp: Response = err;
      let body = resp.json();
      // if (body.Message) {
      //   errorMsg = body.Message;
      // }
    }
  }

   // Returns -1 if both fields empty, 1 if first field only, 2 if second field
   // only. If neither field is empty, returns 0.
  legalLogin(username, password): number {
    if (username == '') {
      if (password == '') {
        return -1;
      }
      return 1;
    }
    if (password == '') {
      return 2;
    }
    return 0;
  }

}
