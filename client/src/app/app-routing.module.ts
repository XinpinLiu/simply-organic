import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

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
  { path: 'sign-up', component: SignUpComponent, title: 'Sign-Up' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
