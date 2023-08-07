import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../models/product.model';

interface CartDetail {
  productList: Product[];
  orderSummary: {
    subTotal: number;
    taxes: number;
    total: number;
  };
}

export const CART_DETAIL_KEY = 'cart_detail';

@Injectable({ providedIn: 'root' })
export class CartService {
  productList: Product[] = [];
  orderSummary = { subTotal: 0.0, taxes: 0.0, total: 0 };
  cartUpdated = new Subject<CartDetail>();

  getCartDetail() {
    const retreivedCart = this.retreiveCartFromLocalStorage();
    this.productList = retreivedCart.productList;
    this.orderSummary = retreivedCart.orderSummary;

    return { productList: this.productList, orderSummary: this.orderSummary };
  }

  updateOrderSummary() {
    this.orderSummary.subTotal = this.productList.reduce(
      (total: number, product: Product) => {
        if (product.price && product.qty) {
          return total + product.price * product.qty;
        } else {
          return total;
        }
      },
      0
    );
    this.orderSummary.taxes = +(this.orderSummary.subTotal * 0.13).toFixed(2);
    this.orderSummary.total = +(
      this.orderSummary.subTotal + this.orderSummary.taxes
    ).toFixed(2);
  }

  private indexOfCartItem(productToGet: Product) {
    return this.productList.findIndex(
      (product) => product.id == productToGet.id
    );
  }

  updateCartItem(productToUpdate: Product, increaseOrDecrease: number) {
    const cartItemIndex = this.indexOfCartItem(productToUpdate);
    if (cartItemIndex != -1) {
      //   this.productList[cartItemIndex].qty += 1;
    }
    this.updateOrderSummary();
    this.storeCartInLocalStorage({
      productList: this.productList,
      orderSummary: this.orderSummary,
    });
    this.cartUpdated.next(this.getCartDetail());
  }

  deleteCartItem(id: any) {
    this.productList.splice(id, 1);
    this.updateOrderSummary();
    this.storeCartInLocalStorage({
      productList: this.productList,
      orderSummary: this.orderSummary,
    });
    this.cartUpdated.next(this.getCartDetail());
  }

  isProductAlreadyInCart() {
    // this.productList.map(())
  }

  addCartItem(product: Product) {
    console.log(product);
    this.productList.push(product);
    this.updateOrderSummary();

    this.storeCartInLocalStorage({
      productList: this.productList,
      orderSummary: this.orderSummary,
    });
    this.cartUpdated.next(this.getCartDetail());
  }

  storeCartInLocalStorage(cartDetail: CartDetail) {
    localStorage.setItem(CART_DETAIL_KEY, JSON.stringify(cartDetail));
  }

  retreiveCartFromLocalStorage() {
    let cartDetail = localStorage.getItem(CART_DETAIL_KEY);
    if (cartDetail) {
      return JSON.parse(cartDetail);
    }
    return {
      productList: [],
      orderSummary: {
        subTotal: 0.0,
        taxes: 0.0,
        total: 0.0,
      },
    };
  }
}
