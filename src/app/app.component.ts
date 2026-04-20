import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  constructor(public authService: AuthService) {
    this.seedManagerUser();
  }

  private seedManagerUser(): void {
    const savedManager = localStorage.getItem('managerUser');

    if (!savedManager) {
      const managerUser = {
        userName: 'Tamar',
        email: 'tamarhadad@gmail.com',
        password: 'Aa1234',
        userRole: 'Manager'
      };

      localStorage.setItem('managerUser', JSON.stringify(managerUser));
    }
  }
}