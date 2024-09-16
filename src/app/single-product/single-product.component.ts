import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-single-product',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css'] 
})
export class SingleProductComponent  implements OnInit {
  pid = input.required();
  http = inject(HttpClient)
  product : any;
  fetchData(){
    this.http.get('https://fakestoreapi.com/products/'+this.pid()).subscribe(
      (response: any) => this.product = response)
  }
  ngOnInit(): void {
    this.fetchData();
  }
  addToCart(){
    alert('Product added to cart');
  }
};