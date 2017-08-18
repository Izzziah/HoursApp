import { Injectable } from '@angular/core';
import 'rxjs/add/operator/share';
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";

// import { Http, Response } from "@angular/http";
import { APIService } from "./api.service";

@Injectable()
export class UserService {
  private loggedIn = false;
  loggedIn$: Observable<any>;
  private _observer: Observer<boolean>;

  public user: any = null;

  public componies: string[];
  public products: string[];
  public projects: string[];
  public tasks: string[];

  constructor(private apiService: APIService) { 
    this.loggedIn$ = new Observable(observer => this._observer = observer).share();
  }

  login(username: string, password: string) {
    // login user if valid, else error msg
    let cmd = 'user/login?username=' + username + '&password=' + password;
    let obser: any = this.apiService.Get(cmd).share();
    obser.subscribe(
      data => {
        console.log(data);
        // what's the deal with sessionStorage never being defined???
        sessionStorage.setItem('user', JSON.stringify(data));
        this.user = data;
        // this.componies = data['Companies'];
        // this.products = data['Products'];
        // this.projects = data['Products'];
        // this.tasks = data['Tasks'];

        this.apiService.setToken(data['AccessToken']);
        this.loginSet(true);
      },
      err => {
        this.loginSet(false);
      }); // end of subscribe
      return obser;
  }

  getUsername(): string {
    return 'DEFAULT';
  }

  public loginSet(loggedIn: boolean) {
      this.loggedIn = loggedIn;
      if (this._observer) {
          this._observer.next(this.loggedIn);
      }
  }
}
