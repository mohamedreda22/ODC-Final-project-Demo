import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { MenuComponent } from './menu/menu.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { BookComponent } from './book/book.component';
import { BlogComponent } from './pages/pages.component';
import { SinglePageComponent } from './single-page/single-page.component';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { RegisterComponent } from './register/register.component';
import { ViewContactsComponent } from './admin/view-contacts/view-contacts.component';
import { ViewBookingsComponent } from './admin/view-bookings/view-bookings.component';
import { ManageMenuItemsComponent } from './admin/manage-menu-items/manage-menu-items.component';
import { ManageUsersComponent } from './admin/manage-users/manage-users.component';
import { ManageArticlesComponent } from './admin/manage-articles/manage-articles.component';

export const routes: Routes = [
    {
        path : "home",
        component : HomeComponent
    },
    {
        path : "",
        component : HomeComponent
    },
        {
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
        path : "articles",
        component : BlogComponent
    }, { 
        path: 'articles/:id',
        component: SinglePageComponent 
    },{
        path : "login",
        component : LoginComponent
    },{ path: 'adminDashboard', 
        component: AdminDashboardComponent 
    },{
        path: 'adminDashboard/users', 
        component: ManageUsersComponent
    },{ 
        path: 'adminDashboard/menu-items', 
        component: ManageMenuItemsComponent
    },{ 
        path: 'adminDashboard/bookings', 
        component: ViewBookingsComponent
    },{ 
        path: 'adminDashboard/contacts', 
        component: ViewContactsComponent
    },{
        path : 'adminDashboard/articles',
        component : ManageArticlesComponent
    }
    ,{
        path : "register",
        component : RegisterComponent
    }
];
