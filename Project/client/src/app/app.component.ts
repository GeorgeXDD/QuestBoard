import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';

  constructor(public userService: UserService,
    public router: Router){}

  isLoggedIn(): boolean {
    return this.userService.getUserIdFromLocalStorage() !== null;
  }

  logout(): void {
    this.userService.clearLocalStorage();
    this.router.navigate(['/login']);
  }
}
