import { Component } from '@angular/core';
import {Book} from './shared/book';
import {falseIfMissing} from 'protractor/built/util';
import {AuthService} from './shared/authentification.service';

@Component({
  selector: 'bs-root',
  templateUrl: './app.component.html',

  styles: []
})
export class AppComponent {


  constructor(private authService : AuthService){  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  isLoggedInAdmin(){
    return this.authService.isLoggedInAdmin();
  }

  getLoginLabel(){
    if(this.isLoggedIn()){
      return "Logout"
    } else {
      return "Login"
    }
  }
}
