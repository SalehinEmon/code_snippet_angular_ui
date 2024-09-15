import { Injectable, signal } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private localStorageService: LocalStorageService) { }

  loggedInStatus = new BehaviorSubject<boolean>(false);

  get getLoggedInStatus() {
    return this.loggedInStatus.asObservable(); // {2}
  }


  isLoggedin(): boolean {
    var token = this.localStorageService.gettoken();
    var tempLoggedInStatus = !((token?.length === 0) || (token === null));

    this.loggedInStatus.next(tempLoggedInStatus);

    return tempLoggedInStatus;
  }
}
