import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ArticleService } from './article.service';
import { Article } from './article.model';

@Component({
  selector: 'app-single-page',
  templateUrl: './single-page.component.html',
  styleUrls: ['./single-page.component.css'],
  standalone: true,
  
})
export class SinglePageComponent implements OnInit {
  Article: Article | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private articleService: ArticleService  
  ) {}

  ngOnInit(): void {
    const articleId = +this.route.snapshot.paramMap.get('id')!;

    if (history.state.articles) {
      this.Article = history.state.articles.find((article: Article) => article.id === articleId);
    } else {
      this.Article = this.articleService.getArticleById(articleId);
    }

    if (!this.Article) {
      console.error("Article not found");
      this.router.navigate(['/articles']); 
    }
  }
}
