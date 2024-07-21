import { Injectable } from '@angular/core';
import { FetchService } from './fetch.service';
import { User } from '../../app/Shared/Models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private loggedIn = false;
    private username = "";
    private password = "";

    loginResponse: User = new User();

    constructor(private fetchService: FetchService) {}

    isLoggedIn(): boolean {
        return this.loggedIn;
    }

    logIn(userLoginAttempt: User): boolean {
        this.fetchService.postData('login', userLoginAttempt).subscribe(
            (response) => {
                this.loginResponse = response;
                if (this.loginResponse.username && this.loginResponse.username.trim() !== '') {
                this.username = this.loginResponse.username;
                this.loggedIn = true;
            } else {
                console.error('Login failed: Invalid username');
                }
            },
            (error) => {
                console.error('Login failed:', error);
        }
    );
    return this.loggedIn;
    }

    logOut() {
        this.username = "";
        this.password = "";
        this.loggedIn = false;
    }

  getUsername(): string {
    return this.username;
  }
}