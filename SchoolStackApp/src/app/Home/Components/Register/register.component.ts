import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FetchService } from '../../../../infrastucture/Services/fetch.service';
import { User } from '../../../Shared/Models/User';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule] // Import ReactiveFormsModule here
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup; // Use the definite assignment assertion operator (!)
  signup: User = new User();

  constructor(private fb: FormBuilder, private fetchService: FetchService) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onRegister(): void {
    if (this.registerForm.valid) {
      this.signup.username = this.registerForm.value.username;
      this.signup.password = this.registerForm.value.password;

      this.fetchService.signup(this.signup).subscribe(
        (response) => {
          console.log(this.signup.username + ' has been registered');
          console.log(response);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
