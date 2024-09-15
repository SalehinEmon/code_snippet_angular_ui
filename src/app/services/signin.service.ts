import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { errorContext } from 'rxjs/internal/util/errorContext';

@Injectable({
  providedIn: 'root',
})
export class SigninService {
  baseurl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  signin(userNameEmail: string, userPassword: string, fullName: string) {
    let fromData = new FormData();

    fromData.append('fullName', fullName);
    fromData.append('userNameEmail', userNameEmail);
    fromData.append('userPassword', userPassword);

    //console.log(fromData);

    return this.http
      .post(this.baseurl + 'signin', fromData).pipe((res)=> {
        //console.log(res);
        return res;
      },);
  }
}
