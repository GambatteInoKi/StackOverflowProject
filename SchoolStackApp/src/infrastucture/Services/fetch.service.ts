import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../../app/Shared/Models/User';

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  private apiUrl = 'http://localhost:5000'; // Ensure the trailing slash is removed

  constructor(private http: HttpClient) { }

  signup(user: User): Observable<any> {
    return this.postData('signup', user);
  }

  login(user: User): Observable<User> {
    return this.postData<User>('login', user);
  }

  postData<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, data).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something went wrong; please try again later.');
  }
}
