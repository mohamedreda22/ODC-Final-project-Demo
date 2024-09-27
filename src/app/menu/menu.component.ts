import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Define the interface for a menu item
interface MenuItem {
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  // Array of menu items
  menuItems: MenuItem[] = [];
  selectedCategory = 'All';

  constructor(private http: HttpClient) {
    this.fetchMenuItems();
  }

  // Fetch all menu items
  fetchMenuItems() {
    this.http.get<MenuItem[]>('http://localhost:5000/api/menu')
      .subscribe((items: MenuItem[]) => {
        this.menuItems = items;
      }, error => {
        console.log('Error fetching menu items', error);
      });
  }

  // Filter menu items by category
  getFilteredMenuItems() {
    if (this.selectedCategory === 'All') {
      return this.menuItems;
    }
    return this.menuItems.filter(item => item.category === this.selectedCategory);
  }

  changeCategory(category: string) {
    this.selectedCategory = category;
  }
}
