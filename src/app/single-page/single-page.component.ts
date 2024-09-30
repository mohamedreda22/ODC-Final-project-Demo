import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { ArticleService } from './article.service';
import { Article } from './article.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-single-page',
  imports:[CommonModule, RouterLink],
  templateUrl: './single-page.component.html',
  styleUrls: ['./single-page.component.css'],
  standalone: true,
})
export class SinglePageComponent implements OnInit {
  Article: Article | undefined;
  articles: Article[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private articleService: ArticleService  
  ) {}

  ngOnInit(): void {
    // Subscribe to route changes and fetch the new article dynamically
    this.route.params.subscribe(params => {
      const articleId = params['id'];
      this.fetchArticleById(articleId);
    });

    // Load related articles only once
    this.loadArticles();
  }

  fetchArticleById(articleId: string): void {
    this.articleService.getArticleById(articleId).subscribe(
      (article) => {
        this.Article = article; // Set the Article if found
      },
      (error) => {
        console.error("Article not found", error);
        this.router.navigate(['/articles']); // Navigate to articles list if not found
      }
    );
  }

  loadArticles(): void {
    this.articleService.getArticles().subscribe((articles) => {
      this.articles = articles; // Assign fetched articles to the articles array
    });
  }
}
