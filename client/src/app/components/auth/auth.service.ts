import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  signUp(username: string, emailAddress: string, password: string) {
    console.log(username, emailAddress, password);
  }

  login() {
    console.log('signed In');
  }
}
