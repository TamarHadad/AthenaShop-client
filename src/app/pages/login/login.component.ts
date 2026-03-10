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

    if (!savedUser) {
      this.loginError = 'No registered user found';
      return;
    }

    const parsedUser = JSON.parse(savedUser);
    const enteredEmail = this.loginForm.value.email;
    const enteredPassword = this.loginForm.value.password;

    if (
      parsedUser.email === enteredEmail &&
      parsedUser.password === enteredPassword
    ) {
      localStorage.setItem('userName', parsedUser.userName);
      this.authService.login();
      this.loginError = '';
      this.router.navigate(['/home']);
    } else {
      this.loginError = 'Email or password is incorrect';
    }
  }
}