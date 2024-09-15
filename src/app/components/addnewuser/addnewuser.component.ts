import { Component } from '@angular/core';
import { SigninService } from '../../services/signin.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-addnewuser',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './addnewuser.component.html',
  styleUrl: './addnewuser.component.css',
})
export class AddnewuserComponent {
  userName: string = '';
  userEmail: string = '';
  userPassword: string = '';
  loading = false;

  constructor(private signInService: SigninService) {}

  signIn() {
    this.signInService
      .signin(this.userEmail, this.userPassword, this.userName)
      .subscribe({
        next: (response:any) => {
          console.log(response);
        },
      });
  }
}
