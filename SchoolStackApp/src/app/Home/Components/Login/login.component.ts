import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../infrastucture/Services/auth.service';
import { User } from '../../../Shared/Models/User';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginAttempt: User = new User();

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.loginAttempt.username = this.loginForm.value.username;
      this.loginAttempt.password = this.loginForm.value.password;

      this.authService.logIn(this.loginAttempt).subscribe(
        (response: User) => {
          if (response.username && response.username.trim() !== '') {
            console.log(response.username + ' has been logged in');
            this.router.navigate(['/search']);
          } else {
            console.error('Login failed: No username in response');
            alert('Login failed: Invalid username or password');
          }
        },
        (error: any) => {
          console.error('Login failed:', error);
          alert('Login failed: Invalid username or password');
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
