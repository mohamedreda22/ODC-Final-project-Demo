import { Component, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from "./home/home.component";
import { ProductComponent } from "./product/product.component";
import { SingleProductComponent } from './single-product/single-product.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NavComponent, FooterComponent, HomeComponent, ProductComponent,SingleProductComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ODC-Final-project-Demo';
  

}
