import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:5000/api/categories'; // Adjust to your actual URL

  constructor(private http: HttpClient) {}

  getCategories(): Observable<{ id: string; name: string }[]> {
    return this.http.get<{ id: string; name: string }[]>(this.apiUrl);
  }
}
