import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product',
  imports : [RouterLink],
  standalone : true,
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  productsArray: any = [];
  httpClient = inject(HttpClient)
  fetchData(){
    this.httpClient.get('https://fakestoreapi.com/products').subscribe(
      (response: any) => this.productsArray = response)
  }
  ngOnInit():void{
    this.fetchData();
  }
}

    

