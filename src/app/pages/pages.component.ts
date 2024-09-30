import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

// Define the interface for an article
interface Article {
  id: number;       
  title: string;
  imgSrc: string;
  altText: string;
  content: string;
  date: string;
  category: string;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {
  articles: Article[] = [];  // Initialize articles as an empty array

  constructor(private http: HttpClient, private router: Router) {
    this.fetchArticles();  // Fetch articles when the component is initialized
  }

  // Fetch all articles from the API
  fetchArticles(): void {
    this.http.get<Article[]>('http://localhost:5000/api/articles')
      .subscribe(
        (data: Article[]) => {
          this.articles = data;  // Assign the fetched data to articles
        },
        (error) => {
          console.error('Error fetching articles:', error);  // Handle errors
        }
      );
  }

  // Navigate to the selected article
  goToArticle(id: number): void {
    console.log('Navigating to article with ID:', id);
    // Navigate using the router to the specified article ID
    this.router.navigate(['/articles', id]); // Adjust this if your route is different
  }
}
