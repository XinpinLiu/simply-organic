import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

export interface AuthResponseData {
  id: string;
  username: string;
  email: string;
  roles: Array<string>;
  accessToken: string;
  refreshToken: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  signUp(username: string, emailAddress: string, password: string) {
    console.log(username, emailAddress, password);
    const url = environment.baseUrl + '/auth/signup';
    return this.http
      .post<AuthResponseData>(url, {
        username: username,
        user_email: emailAddress,
        user_password: password,
        user_telephone: 1234567890,
        user_address: '',
      })
      .pipe(
        catchError((errorResponse: HttpErrorResponse) => {
          console.log(errorResponse);
          return throwError('Error occurred while signing up!');
        }),
        tap((responseData) => {
          this.handleResponse(
            responseData.username,
            responseData.email,
            responseData.roles,
            responseData.accessToken,
            responseData.refreshToken
          );
        })
      );
  }

  login(emailAddress: string, password: string) {
    console.log('log In');
    const url = environment.baseUrl + '/auth/signin';
    return this.http
      .post<AuthResponseData>(url, {
        user_email: emailAddress,
        user_password: password,
      })
      .pipe(
        catchError((errorResponse: HttpErrorResponse) => {
          return throwError('Error occurred while logging in!');
        }),
        tap((responseData) => {
          this.handleResponse(
            responseData.username,
            responseData.email,
            responseData.roles,
            responseData.accessToken,
            responseData.refreshToken
          );
        })
      );
  }

  logout() {
    const url = environment.baseUrl + '/auth/signout';
    this.http.post(url, {}).subscribe((data) => {
      this.user.next(null);
      this.router.navigate(['/']);
    });
  }

  handleResponse(
    username: string,
    email: string,
    roles: Array<string>,
    accessToken: string,
    refreshToken: string
  ) {
    const user = new User(username, email, roles, accessToken, refreshToken);
    this.user.next(user);
  }
}
