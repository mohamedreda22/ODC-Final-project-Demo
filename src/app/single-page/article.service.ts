import { Injectable } from '@angular/core';
import { Article } from './article.model'; // Define your article interface or model

@Injectable({ providedIn: 'root' })
export class ArticleService {
  private articles: Article[] = [
    // your articles array
  ];

  getArticleById(id: number): Article | undefined {
    return this.articles.find(article => article.id === id);
  }

  getArticles(): Article[] {
    return this.articles;
  }
}
