/* import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { articles } from '../pages/pages.component';
interface Article {
    id: number;
    title: string;
    imgSrc: string;
    altText: string;
    content: string;
}

@Component({
    selector: 'app-single-page',
    templateUrl: './single-page.component.html',
    styleUrls: ['./single-page.component.css'],
    standalone: true,
    imports: [CommonModule]
})
export class SinglePageComponent implements OnInit {
    mainArticle?: Article;
    articles: Article[] = articles;
    articleId!: number; // Use non-null assertion operator

    constructor(private router: Router) { }

    ngOnInit(): void {
        // Set articleId based on your routing logic
        this.articleId = 1; // Replace with your logic to get the article ID from the route
        this.mainArticle = this.articles.find(article => article.id === this.articleId);
    }

    goToArticle(id: number): void {
        this.router.navigate(['/articles', id]); // Adjust the route as necessary
    }
}
 */