import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AuthComponent } from './components/auth/auth.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductsListComponent } from './components/products-list/products-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    ProductDetailsComponent,
    ProductsListComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    ProductEditComponent,
    AuthComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
