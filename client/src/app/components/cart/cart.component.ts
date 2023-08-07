import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export default class CartComponent implements OnInit {
  productList: Product[] = [];

  orderSummary = { subTotal: 0.0, taxes: 0.0, total: 0 };

  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    const cartDetails = this.cartService.getCartDetail();
    this.productList = cartDetails.productList;
    this.orderSummary = cartDetails.orderSummary;
    this.cartService.cartUpdated.subscribe((cartDetails) => {
      this.productList = cartDetails.productList;
      this.orderSummary = cartDetails.orderSummary;
    });
  }

  increaseProductQty(product: Product) {
    this.cartService.updateCartItem(product, 1);
  }
  decreaseProductQty(product: Product) {
    this.cartService.updateCartItem(product, -1);
  }

  deleteProduct(id: number) {
    this.cartService.deleteCartItem(id);
  }
}
