import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-admin-menu-items',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-menu-items.component.html',
  styleUrls: ['./manage-menu-items.component.css']
})
export class ManageMenuItemsComponent {
  menuItems: any[] = [];
  newItem = { name: '', description: '', price: 0, image: '' }; // New item object
  showForm = false; // Track visibility of the add item form
  token: string | null = localStorage.getItem('token'); // Retrieve token from localStorage

  constructor(private http: HttpClient) {
    this.loadMenuItems();
  }

  // Load all menu items from the API
  loadMenuItems() {
    this.http.get<any[]>('http://localhost:5000/api/menu')
      .subscribe(
        (data) => {
          this.menuItems = data;
        },
        (error) => {
          console.error('Error loading menu items', error);
        }
      );
  }

  // Toggle the visibility of the add menu item form
  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.resetForm(); // Reset form fields when toggled off
    }
  }

  // Reset new item form fields
  resetForm() {
    this.newItem = { name: '', description: '', price: 0, image: '' };
  }

  // Add a new menu item
  addMenuItem() {
    if (!this.token) {
      console.error('No token found. Unable to add menu item.');
      return; 
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.post('http://localhost:5000/api/menu', this.newItem, { headers })
      .subscribe(
        response => {
          console.log('Menu item added', response);
          this.loadMenuItems(); // Reload menu items after adding
          this.resetForm(); // Reset form fields after adding
          this.showForm = false; // Hide the form after submission
        },
        error => {
          console.error('Error adding menu item', error);
          console.log('Token used for adding menu item:', this.token);

        }
      );
  }

  // Delete a menu item by ID
  deleteMenuItem(id: string) {
    if (!this.token) {
      console.error('No token found. Unable to delete menu item.');
      return; // Prevent deleting if there's no token
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.delete(`http://localhost:5000/api/menu/${id}`, { headers })
      .subscribe(
        () => {
          this.loadMenuItems(); // Reload menu items after deletion
        },
        error => {
          console.error('Error deleting menu item', error);
        }
      );
  }
}
