import { Component } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  constructor(
    private localStorageService: LocalStorageService,
    private route: ActivatedRoute,
    private authService:AuthService,
    private router: Router){}

    onLogOutBtnPress(){
      this.localStorageService.removeToken();
      this.localStorageService.removeUser();
      this.authService.isLoggedin();
      this.router.navigate(['/login']);
    }
    ngOnInit() {
      this.localStorageService.gettoken();
    }

}
