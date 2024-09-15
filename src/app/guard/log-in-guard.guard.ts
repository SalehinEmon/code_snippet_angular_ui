import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoginService } from '../services/login.service';
import { LocalStorageService } from '../services/local-storage.service';

export const logInGuardGuard: CanActivateFn = (route, state) => {
  var loginStatus = inject(AuthService).isLoggedin();
  var token = inject(LocalStorageService).gettoken();
  if (loginStatus === false) {
    inject(Router).navigate(['/login']);
  }
  else if (token != null) {

    var validationResponse = inject(LoginService).tokenValidator(token!)
      .subscribe({
        next: (response) => {
          if (loginStatus === false || response.isSuccess == false) {
            inject(Router).navigate(['/login']);
          }
        },
        error: (error: any) => {
          if (loginStatus === false) {
            inject(Router).navigate(['/login']);
          }
        },
        complete: () => {
          if (loginStatus === false) {
            inject(Router).navigate(['/login']);
          }

        }
      });
  }


  return loginStatus;
};
