import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private userService: UserService, private router: Router) {}

  login(username: string, password: string): void {
    const loginData = { username, password };

    this.userService.ApiUserLogin(loginData).subscribe(
      (response) => {
      const userId = response?.id;

      if (userId) {
        this.userService.setUserIdInLocalStorage(userId);
        this.router.navigate(['/dashboard']);
      }
      
      this.router.navigate(['/dashboard']);

      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }
}
