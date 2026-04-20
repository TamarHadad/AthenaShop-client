import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginError: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/)
        ]
      ]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const savedUser = localStorage.getItem('registeredUser');
    const savedManager = localStorage.getItem('managerUser');

    const enteredEmail = this.loginForm.value.email;
    const enteredPassword = this.loginForm.value.password;

    const parsedUser = savedUser ? JSON.parse(savedUser) : null;
    const parsedManager = savedManager ? JSON.parse(savedManager) : null;

    if (
      parsedManager &&
      parsedManager.email === enteredEmail &&
      parsedManager.password === enteredPassword
    ) {
      localStorage.setItem('userName', parsedManager.userName);
      localStorage.setItem('userRole', parsedManager.userRole);
      this.authService.login();
      this.loginError = '';
      this.router.navigate(['/home']);
      return;
    }

    if (
      parsedUser &&
      parsedUser.email === enteredEmail &&
      parsedUser.password === enteredPassword
    ) {
      localStorage.setItem('userName', parsedUser.userName);
      localStorage.setItem('userRole', parsedUser.userRole);
      this.authService.login();
      this.loginError = '';
      this.router.navigate(['/home']);
      return;
    }

    this.loginError = 'Email or password is incorrect';
  }
}