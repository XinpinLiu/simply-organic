import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private cartService: CartService, private router: Router) {}
  ngOnInit(): void {
    const cartDetails = this.cartService.getCartDetail();
    this.productList = cartDetails.productList;
    this.orderSummary = cartDetails.orderSummary;
    this.cartService.cartUpdated.subscribe((cartDetails) => {
      this.productList = cartDetails.productList;
      this.orderSummary = cartDetails.orderSummary;
    });
  }

  increaseProductQty(id: number) {
    this.cartService.updateCartItem(id, 1);
  }
  decreaseProductQty(id: number) {
    this.cartService.updateCartItem(id, -1);
  }

  deleteProduct(id: number) {
    this.cartService.deleteCartItem(id);
  }

  onCheckOutBtnClick() {
    this.router.navigate(['/checkout']);
  }
}
