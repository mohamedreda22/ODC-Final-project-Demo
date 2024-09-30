import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Import FormsModule for form handling
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [FormsModule,CommonModule], // Add FormsModule for template-driven forms
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent {
  users: any[] = []; // List of users
  newUser = { _id:'', username: '', password: ''}; // New user object
  token: string | null = localStorage.getItem('token'); // JWT token

  constructor(private http: HttpClient) {
    this.loadUsers(); // Load users on initialization
  }

  // Load all users from the API
  loadUsers() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.http.get<any[]>('http://localhost:5000/api/users', { headers }).subscribe(
      (data) => {
        this.users = data; // Assign the fetched users to the users array
      },
      (error) => {
        console.error('Error loading users', error);
      }
    );
  }

  // Add a new user
  addUser() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.http.post('http://localhost:5000/api/register', this.newUser, { headers }).subscribe(
      () => {
        this.loadUsers(); // Reload users after adding new one
        this.newUser = { _id:'', username: '', password: '' }; // Reset new user form
      },
      (error) => {
        console.error('Error adding user', error);
      }
    );
  }

  // Delete a user by ID
  deleteUser(_id: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.http.delete(`http://localhost:5000/api/users/${_id}`, { headers }).subscribe(
      () => {
        this.loadUsers(); 
      },
      (error) => {
        console.error('Error deleting user', error);
      }
    );
  }
}
