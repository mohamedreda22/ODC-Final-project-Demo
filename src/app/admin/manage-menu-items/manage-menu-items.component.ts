import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../../../backend/models/Category';

@Component({
  selector: 'app-admin-menu-items',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-menu-items.component.html',
  styleUrls: ['./manage-menu-items.component.css']
})
export class ManageMenuItemsComponent implements OnInit {
  menuItems: any[] = [];
  newItem = { _id:'', name: '', description: '', price: 0, category: '', image: null };
  showForm = false;
  isEditMode = false;  // Flag to indicate if in edit mode
  token: string | null = localStorage.getItem('token');
  categories: { id: string; name: string }[] = [];
  selectedFile: File | null = null;

  constructor(private categoryService: CategoryService, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadMenuItems();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      (data) => {
        this.categories = data; 
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    );
  }

  loadMenuItems() {
    this.http.get<any[]>('http://localhost:5000/api/menu').subscribe(
      (data) => {
        this.menuItems = data;
      },
      (error) => {
        console.error('Error loading menu items', error);
      }
    );
  }

  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.resetForm();
    }
  }

  resetForm() {
    this.newItem = { _id:'', name: '', description: '', price: 0, category: '', image: null };
    this.isEditMode = false; // Reset edit mode flag
  }

  addMenuItem() {
    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const formData = new FormData();
      formData.append('name', this.newItem.name);
      formData.append('description', this.newItem.description);
      formData.append('price', this.newItem.price.toString());
      formData.append('category', this.newItem.category);
      if (this.selectedFile) {
        formData.append('image', this.selectedFile, this.selectedFile.name);
      }

      const apiUrl = this.isEditMode 
        ? `http://localhost:5000/api/menu/${this.newItem._id}` // Use item ID for updating
        : 'http://localhost:5000/api/menu'; // Add new item

      const requestMethod = this.isEditMode ? this.http.put(apiUrl, formData, { headers }) : this.http.post(apiUrl, formData, { headers });

      requestMethod.subscribe(
        () => {
          this.loadMenuItems();
          this.resetForm();
          this.selectedFile = null;
        },
        (error) => {
          console.error('Error saving menu item', error);
        }
      );
    } else {
      console.error('No token found.');
    }
  }

  // Edit menu item and populate form
  editMenuItem(itemId: string) {
    const item = this.menuItems.find(i => i._id === itemId);
    if (item) {
      this.newItem = { ...item }; // Populate form with selected item data
      this.isEditMode = true; // Set edit mode
      this.showForm = true; // Show the form
    }
  }
  deleteMenuItem(_id: string) {
    this.http.delete(`http://localhost:5000/api/menu/${_id}`).subscribe(
      () => {
        this.loadMenuItems();
      },
      (error) => {
        console.error('Error deleting menu item', error); // Log the error
      }
    );
  }
  
  
/*   deleteMenuItem(_id: string) {
    this.http.delete(`http://localhost:5000/api/menu/${_id}`).subscribe(
      () => {
        this.loadMenuItems();
      },
      (error) => {
        console.error('Error deleting menu item', error);
      }
    );
  } */
}
