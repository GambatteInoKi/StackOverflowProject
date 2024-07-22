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
  private username = '';

  constructor(private fetchService: FetchService) {
    this.loadUser();
  }

  isLoggedIn(): boolean {
    if (!this.loggedIn) {
      this.loadUser();
    }
    return this.loggedIn;
  }

  logIn(userLoginAttempt: User): Observable<User> {
    return this.fetchService.login(userLoginAttempt).pipe(
      map((response: User) => {
        if (response.username && response.username.trim() !== '') {
          this.username = response.username;
          this.loggedIn = true;
          this.saveUser(response);
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
    this.username = '';
    this.loggedIn = false;
    this.clearUser();
  }

  getUsername(): string {
    return this.username;
  }

  private saveUser(user: User): void {
    sessionStorage.setItem('username', user.username || '');
    this.loggedIn = true;
  }

  private loadUser(): void {
    const username = sessionStorage.getItem('username');
    if (username) {
      this.username = username;
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }

  private clearUser(): void {
    sessionStorage.removeItem('username');
    this.loggedIn = false;
  }
}
