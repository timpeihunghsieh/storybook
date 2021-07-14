import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('isLoggedIn');
    return token ? true : false;
  }

  setIsLoggedIn(): void {
    localStorage.setItem('isLoggedIn', "true");
  }

  logOut(): void {
    localStorage.clear();
  }
}
