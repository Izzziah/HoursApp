import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from "./app-routing.module";
import { UserHomeComponent } from './user-home/user-home.component';

import { UserService } from "./services/user.service";
import { APIService } from "./services/api.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserHomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [UserService, APIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
