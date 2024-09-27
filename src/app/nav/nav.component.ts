import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth.service'; 
import { CommonModule } from '@angular/common'; // Import CommonModule


@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  constructor(private authService: AuthService) {}
  isAdminLoggedIn(): boolean {
    return this.authService.isAdminLoggedIn();
  }
  //logout
  logout() {
    this.authService.logout();
    localStorage.removeItem('token');
  }

}
