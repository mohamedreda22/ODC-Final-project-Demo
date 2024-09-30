import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ArticleService } from './article.service';
import { Article } from './article.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-single-page',
  imports:[CommonModule],
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
    const articleId = this.route.snapshot.paramMap.get('id')!;

    // Fetch the article by ID
    this.articleService.getArticleById(articleId).subscribe(
      (article) => {
        this.Article = article; // Set the Article if found
      },
      (error) => {
        console.error("Article not found", error);
        this.router.navigate(['/articles']); // Navigate to articles list if not found
      }
    );

    // Load related articles
    this.loadArticles();
  }

  loadArticles() {
    this.articleService.getArticles().subscribe((articles) => {
      this.articles = articles; // Assign fetched articles to the articles array
    });
  }

  goToArticle(articleId: number) {
    this.router.navigate(['/articles', articleId]); // Adjust route as per your routing configuration
  }
}
