import { CategoryService } from './../../../../backend/models/Category';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-articles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-articles.component.html',
  styleUrls: ['./manage-articles.component.css']
})
export class ManageArticlesComponent implements OnInit {
  articles: any[] = [];
  newArticle = { _id: '', title: '', altText: '', content: '', date: '', category: '', imgSrc: '' };
  showForm = false;
  isEditMode = false; // Flag to indicate if in edit mode
  categories: { id: string; name: string }[] = [];
  selectedFile: File | null = null;
  token: string | null = localStorage.getItem('token');

  constructor(private categoryService: CategoryService, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadArticles();      
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

  loadArticles() {
    this.http.get<any[]>('http://localhost:5000/api/articles').subscribe(
      (data) => {
        this.articles = data;
      },
      (error) => {
        console.error('Error loading articles', error);
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
    this.newArticle = { _id: '', title: '', altText: '', content: '', date: '', category: '', imgSrc: '' };
    this.selectedFile = null;
    this.isEditMode = false; 
  }

  addArticle() {
    const token = localStorage.getItem('token');
  
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const formData = new FormData();

      // Validate required fields
      if (!this.newArticle.title || !this.newArticle.content || !this.newArticle.category || !this.selectedFile) {
        console.error('All fields are required.');
        return;
      } 

      // Append form data
      formData.append('title', this.newArticle.title);
      formData.append('altText', this.newArticle.altText);
      formData.append('content', this.newArticle.content);
      formData.append('date', this.newArticle.date);
      formData.append('category', this.newArticle.category);
      formData.append('image', this.selectedFile, this.selectedFile.name); // Ensure image is appended

      const apiUrl = this.isEditMode 
        ? `http://localhost:5000/api/articles/${this.newArticle._id}` // Update article
        : 'http://localhost:5000/api/articles'; // Create new article

      const requestMethod = this.isEditMode 
        ? this.http.put(apiUrl, formData, { headers }) 
        : this.http.post(apiUrl, formData, { headers });

      requestMethod.subscribe(
        () => {
          this.loadArticles();
          this.resetForm();
          this.showForm = false;
        },
        (error) => {
          console.error('Error saving article', error.error);
        }
      );
    } else {
      console.error('No token found.');
    }
  }

  editArticle(articleId: string) {
    const article = this.articles.find(a => a._id === articleId);
    if (article) {
      this.newArticle = { ...article }; 
      this.isEditMode = true; 
      this.showForm = true; 
    }
  }

  deleteArticle(_id: string) {
    this.http.delete(`http://localhost:5000/api/articles/${_id}`).subscribe(
      () => {
        this.loadArticles();
      },
      (error) => {
        console.error('Error deleting article', error);
      }
    );
  }
}
