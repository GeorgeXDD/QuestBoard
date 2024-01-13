import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private userService: UserService, private router: Router) {}

  register(username: string, email: string, password: string): void {
    const registerData = { username, email, password };

    this.userService.ApiUserRegister(registerData).subscribe(
      (response) => {
        const userId = response.id;
        this.userService.setUserIdInLocalStorage(userId);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Registration failed', error);
      }
    );
  }
}
