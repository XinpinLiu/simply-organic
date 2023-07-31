import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User | null>(null);

  signUp(username: string, emailAddress: string, password: string) {
    console.log(username, emailAddress, password);
  }

  login() {
    console.log('signed In');
  }

  logout() {}
}
