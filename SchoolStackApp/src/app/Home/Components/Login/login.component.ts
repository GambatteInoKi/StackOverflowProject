import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FetchService } from '../../../../infrastucture/Services/fetch.service';
AuthService
import { User } from '../../../Shared/Models/User';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../infrastucture/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule] // Import ReactiveFormsModule here
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup; // Use the definite assignment assertion operator (!)
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
          console.log(response.username + ' has been logged in');
          this.router.navigate(['/search']); // Navigate to /search after successful login
        },
        (error: any) => {
          console.error('Login failed:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
