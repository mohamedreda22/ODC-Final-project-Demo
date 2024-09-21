import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterLink], 
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
   articles = [
    {
      id: 1,
      title: "How to prepare a delicious gluten-free sushi",
      imgSrc: "img01.png",
      altText: "Sushi",
      content: "Sushi is a delicate and flavorful Japanese dish that requires attention to detail. In this guide, we'll go over the steps you need to make delicious sushi from the comfort of your home...",
      date: "January 3, 2023",
      category: "Recipes"
    },
    {
      id: 2,
      title: "Exclusive baking lessons from the pastry king",
      imgSrc: "img02.png",
      altText: "Baking",
      content: "Learn expert baking tips from the famous pastry king to create perfect desserts.",
      date: "January 10, 2023",
      category: "Baking"
    },
    {
      id: 3,
      title: "How to prepare the perfect fries in an air fryer",
      imgSrc: "img03.png",
      altText: "Fries",
      content: "Discover the secret to making crispy, golden fries using an air fryer.",
      date: "January 15, 2023",
      category:"Recipes"
    },
    {
      id: 4,
      title: "How to prepare delicious chicken tenders",
      imgSrc: "img04.png",
      altText: "Chicken",
      content: "Make mouth-watering chicken tenders with this easy-to-follow recipe.",
      date: "April 18, 2023",
      category: "Recipes"
    },
    {
      id: 5,
      title: "5 great cooking gadgets you can buy to save time",
      imgSrc: "img05.png",
      altText: "Cooking Gadgets",
      content: "Explore five essential cooking gadgets that can help you save time in the kitchen.",
      date: "April 25, 2023",
      category: "Cooking Tips"
    },
    {
      id: 6,
      title: "The secret tips & tricks to prepare a perfect burger",
      imgSrc: "img06.png",
      altText: "Burger",
      content: "Learn the best tips for making a perfect burger from scratch.",
      date: "May 1, 2023",
      category: "Cooking Tips"
    },
    {
      id: 7,
      title: "7 delicious cheesecake recipes you can prepare",
      imgSrc: "img07.png",
      altText: "Cheesecake",
      content: "Discover seven scrumptious cheesecake recipes to impress your friends and family.",
      date: "May 10, 2023",
      category: "Desserts"
    },
    {
      id: 8,
      title: "5 great pizza restaurants you should visit in this city",
      imgSrc: "img08.png",
      altText: "Pizza",
      content: "Check out these five amazing pizza restaurants you must try!",
      date: "May 15, 2023",
      category: "Dining Out"
    },
    {
      id: 9,
      title: "How to make a delicious fruit smoothie",
      imgSrc: "img09.png",
      altText: "Smoothie",
      content: "Make a refreshing fruit smoothie with this easy recipe.",
      date: "May 20, 2023",
      category: "Recipes"
    },
    {
      id: 10,
      title: "How to prepare a healthy green smoothie",
      imgSrc: "img10.png",
      altText: "Green Smoothie",
      content: "This simple recipe will help you make a nutritious green smoothie.",
      date: "May 25, 2023",
      category: "Healthy Eating"
    },
    {
      id: 11,
      title: "Top 20 simple and quick desserts for kids",
      imgSrc: "img11.png",
      altText: "Desserts for Kids",
      content: "Explore twenty quick and easy dessert recipes perfect for kids.",
      date: "June 1, 2023",
      category: "Desserts"
    },
    {
      id: 12,
      title: "How to make a delicious fruit salad",
      imgSrc: "img12.png",
      altText: "Fruit Salad",
      content: "Learn how to create a colorful and tasty fruit salad.",
      date: "June 5, 2023",
      category: "Healthy Eating"
    }
  ];
  ngOnInit() {
  }
  
  // Function to get all articles
  getArticles() {
    return this.articles;
  }
}