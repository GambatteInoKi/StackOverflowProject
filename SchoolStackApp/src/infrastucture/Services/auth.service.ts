import { Injectable } from '@angular/core';
import { FetchService } from './fetch.service';
import { User } from '../../app/Shared/Models/User';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

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

  logIn(userLoginAttempt: User): Observable<User> {
    return this.fetchService.login(userLoginAttempt).pipe(
      map((response: User) => {
        if (response.username && response.username.trim() !== '') {
          this.username = response.username;
          this.loggedIn = true;
          return response;
        } else {
          throw new Error('Invalid username');
        }
      }),
      catchError(error => {
        console.error('Login failed:', error);
        return of(new User());
      })
    );
  }

  logOut(): void {
    this.username = "";
    this.password = "";
    this.loggedIn = false;
  }

  getUsername(): string {
    return this.username;
  }
}
