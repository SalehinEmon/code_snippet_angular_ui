import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormsModule } from '@angular/forms';
import { ResponseModel } from '../../models/response.model';
import { UserModel } from '../../models/user_model';
import { LocalStorageService } from '../../services/local-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  userName: string = '';
  password: string = '';
  user: UserModel = {};
  loading: boolean = false;
  responseMsg: String = '';

  loginResponse: ResponseModel = {};

  constructor(
    private loginService: LoginService,
    private localStorageService: LocalStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  login() {
    this.loading = true;
    this.loginService.login(this.userName, this.password).subscribe({
      next: (response) => {
        this.loginResponse = response;
        //console.log(response.token);
      },
      error: (error: any) => {
        this.loading = false;
        this.responseMsg = "Failed to log in";
        this.loginResponse = error.error;
        //console.log(this.loginResponse.message);
      },
      complete: () => {
        if (this.loginResponse.isSuccess === true) {
          this.loading = false;

          this.user = this.loginResponse.requestedBody as UserModel;

          this.localStorageService.setUser(this.user);
          this.localStorageService.setToken(this.loginResponse.token!);
          // var testvar = this.localStorageService.gettoken();
          this.router.navigate(['']);
          this.authService.isLoggedin();
          //console.log('Log in Successful');
        } else {
          this.responseMsg = "Failed to log in";

          //console.log('Log in Failed');
        }
      },
    });
  }
}
