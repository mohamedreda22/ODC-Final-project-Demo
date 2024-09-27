import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  isAdminLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Check if the token exists
  }

  logout() {
    localStorage.removeItem('token'); // Remove token on logout
  }
}
