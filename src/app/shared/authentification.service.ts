import {Injectable} from '@angular/core';
import {isNullOrUndefined} from "util";
import {HttpClient} from "@angular/common/http";
import * as decode from 'jwt-decode';
import {retry} from 'rxjs/operators';


interface User {
  result: {
    created_at: Date,
    email: string,
    id: number,
    name: string,
    updated_at: Date,
    isAdmin: boolean
  }
}

@Injectable()
export class AuthService {

  private api:string = 'http://bookstore19.s1610456031.student.kwmhgb.at/api/auth';

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string ) {
    return this.http.post(`${this.api}/login`, {'email': email, 'password': password});
  }

  public setCurrentUserId(){
    this.http.get<User>(`${this.api}/user`).pipe(retry(3)).subscribe(res =>{
        localStorage.setItem('userId', res.result.id.toString());
      }
    );
  }

  public getCurrentUserId(){
    return Number.parseInt(localStorage.getItem('userId'));
  }

  public setLocalStorage(token: string) {
    const decodedToken = decode(token);
    localStorage.setItem('token', token);
    localStorage.setItem('userId', decodedToken.user.id);
    localStorage.setItem('isAdmin', decodedToken.user.isAdmin);
  }

  logout() {
    this.http.post(`${this.api}/logout`, {});
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("isAdmin");
    console.log("logged out");
  }

  public isLoggedIn() {
    return !isNullOrUndefined(localStorage.getItem("token"));
  }

  public isLoggedInAdmin() {
    if(!isNullOrUndefined(localStorage.getItem("token"))){
      let token = decode(localStorage.getItem('token'));
      return token.user.isAdmin;
    }
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

}
