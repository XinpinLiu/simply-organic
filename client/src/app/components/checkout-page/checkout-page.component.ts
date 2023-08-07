import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css'],
})
export class CheckoutPageComponent implements OnInit {
  orderSummary = { subTotal: 0.0, taxes: 0.0, total: 0 };
  productList!: Product[];
  paymentMode = '1';
  constructor(private cartService: CartService, private router: Router) {}

  onSubmit(paymentForm: NgForm) {
    const formData = paymentForm.value;

    if (paymentForm.valid) {
      const data = {
        order_delivery_address: formData.deliveryAddress,
        productList: this.productList,
        payment: {},
      };
      if (this.paymentMode == '1') {
        data.payment = {
          mode: 1,
          details: {
            name: formData.name,
            email: formData.email,
            cardNumber: formData.cardNumber,
            expiryDate: formData.expiryDate,
            cvv: formData.cvvNumber,
          },
        };
      } else {
        data.payment = {
          mode: 0,
        };
      }
      console.log(data);
      this.router.navigate(['/confirmation']);
    }
  }

  ngOnInit(): void {
    const { productList, orderSummary } = this.cartService.getCartDetail();
    this.productList = productList;
    this.orderSummary = orderSummary;
  }
}
