import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { MenuComponent } from './menu/menu.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { BookComponent } from './book/book.component';
import { PagesComponent } from './pages/pages.component';

export const routes: Routes = [
    {
        path : "home",
        component : HomeComponent
    },{
        path : "products",
        component : ProductComponent
    },
    {
        path : "products/:pid",
        component : SingleProductComponent
    },{
        path : "menu",
        component : MenuComponent
    },{
        path : "contact",
        component : ContactComponent
    },{
        path : "about",
        component : AboutComponent
    },{
        path : "book",
        component : BookComponent
    },{
        path : "pages",
        component : PagesComponent
    }
];
