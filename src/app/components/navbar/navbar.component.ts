import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {
  userName: string = '';
  isManagerUser: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userName = localStorage.getItem('userName') || '';
    this.isManagerUser = this.authService.isManager();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}