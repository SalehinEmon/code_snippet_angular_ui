import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ResponseModel } from '../models/response.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) { }

  login(userEmail: string, userPassword: string) {
    let fromData = new FormData();

    fromData.append('userNameEmail', userEmail);
    fromData.append('userPassword', userPassword);
    //console.log(fromData);
    return this.http.post<ResponseModel>(this.baseUrl + 'login', fromData);

  }

  tokenValidator(token: string) {
    let fromData = new FormData();

    fromData.append('token', token);
    //console.log(fromData);
    return this.http.post<ResponseModel>
      (this.baseUrl + 'login/tokencheck', fromData);

  }
}
