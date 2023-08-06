import { Component } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  productList: Product[] = [
    { name: 'Free-Range Egg', category: 'Dairy & Eggs', price: 2.99 },
    { name: 'Free-Range Egg', category: 'Dairy & Eggs', price: 2.99 },
    { name: 'Free-Range Egg', category: 'Dairy & Eggs', price: 2.99 },
  ];

  orderSummary = { subTotal: 10.0, taxes: 3.0, total: 13 };
}
