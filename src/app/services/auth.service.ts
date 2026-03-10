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
  }

  isUserLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
}