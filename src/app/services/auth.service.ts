import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  login(): void {
    localStorage.setItem('isLoggedIn', 'true');
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
  }

  isUserLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  isManager(): boolean {
    return localStorage.getItem('userRole') === 'Manager';
  }
}