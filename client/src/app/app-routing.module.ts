import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AuthComponent } from './components/auth/auth.component';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductsListComponent } from './components/products-list/products-list.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
    title: 'Home',
    data: { title: 'Home' },
  },
  { path: 'shop', component: ProductsListComponent, title: 'Shop' },
  {
    path: 'products/:id',
    component: ProductEditComponent,
    title: 'Product',
  },
  { path: 'add', component: AddProductComponent, title: 'Add' },
  { path: 'cart', component: CartComponent, title: 'Cart' },
  { path: 'sign-up', component: AuthComponent, title: 'Sign-Up' },
  { path: 'login', component: AuthComponent, title: 'Login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
