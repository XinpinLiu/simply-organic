import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

export interface AuthResponseData {
  username: string;
  emailAddress: string;
  token: string;
  expiresIn: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {}

  signUp(username: string, emailAddress: string, password: string) {
    console.log(username, emailAddress, password);
    return this.http
      .post<AuthResponseData>(environment.baseUrl + '/signup', {
        username,
        emailAddress,
        password,
      })
      .pipe(
        catchError((errorResponse: HttpErrorResponse) => {
          return throwError('Error occurred while signing up!');
        }),
        tap((responseData) => {
          this.handleResponse(
            responseData.username,
            responseData.emailAddress,
            responseData.token,
            +responseData.expiresIn
          );
        })
      );
  }

  login(emailAddress: string, password: string) {
    console.log('log In');
    return this.http
      .post<AuthResponseData>(environment.baseUrl + '/login', {
        emailAddress,
        password,
      })
      .pipe(
        catchError((errorResponse: HttpErrorResponse) => {
          return throwError('Error occurred while logging in!');
        }),
        tap((responseData) => {
          this.handleResponse(
            responseData.username,
            responseData.emailAddress,
            responseData.token,
            +responseData.expiresIn
          );
        })
      );
  }

  logout() {
    this.user.next(null);
  }

  handleResponse(
    username: string,
    email: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(username, email, token, expirationDate);
    this.user.next(user);
  }
}
