import { Injectable } from '@angular/core';
import { UserModel } from '../models/user_model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

 private loginUserKey = 'userKey';
 private tokenKey:string = 'tokenKey';

  constructor() { }

  setUser(user:UserModel){
    localStorage.setItem(this.loginUserKey, JSON.stringify(user));
  }
  removeUser(){
    localStorage.removeItem(this.loginUserKey);
  }

  setToken(token:string){
    localStorage.setItem(this.tokenKey, token);
  }

gettoken(){
  return localStorage.getItem(this.tokenKey);
}
  removeToken(){
    localStorage.removeItem(this.tokenKey);
  }

}
