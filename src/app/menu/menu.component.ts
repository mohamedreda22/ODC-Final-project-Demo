import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  // Menu items array
  menuItems = [
    { id: 1, name: "Fried Eggs", price: 9.99, image: "eggs.png", description: "Made with eggs, lettuce, salt, oil, and other ingredients.", category: "Breakfast" },
    { id: 2, name: "Hawaiian Pizza", price: 15.99, image: "pizza1.png", description: "Made with eggs, lettuce, salt, oil, and other ingredients.", category: "Main Dishes" },
    { id: 3, name: "Martinez Cocktail", price: 7.25, image: "drinks1.png", description: "Made with eggs, lettuce, salt, oil, and other ingredients.", category: "Drinks" },
    { id: 4, name: "Butterscotch Cake", price: 20.99, image: "chess-cake.png", description: "Made with eggs, lettuce, salt, oil, and other ingredients.", category: "Desserts" },
    { id: 5, name: "Mint Lemonade", price: 5.89, image: "lemon.png", description: "Made with eggs, lettuce, salt, oil, and other ingredients.", category: "Drinks" },
    { id: 6, name: "Chocolate Icecream", price: 18.05, image: "dark.png", description: "Made with eggs, lettuce, salt, oil, and other ingredients.", category: "Desserts" },
    { id: 7, name: "Cheese Burger", price: 12.55, image: "burger1.png", description: "Made with eggs, lettuce, salt, oil, and other ingredients.", category: "Main Dishes" },
    { id: 8, name: "Classic Waffles", price: 12.99, image: "waffles.png", description: "Made with eggs, lettuce, salt, oil, and other ingredients.", category: "Desserts" },
  ];

  selectedCategory = 'All';

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
