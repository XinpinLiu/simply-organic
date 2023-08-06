import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-detailed-view',
  templateUrl: './product-detailed-view.component.html',
  styleUrls: ['./product-detailed-view.component.css'],
})
export class ProductDetailedViewComponent {
  @Input('product') product!: Product;
  @Output() isModalOpen = new EventEmitter();
  showToastMsg: boolean = false;
  onCloseBtnClick() {
    this.isModalOpen.emit();
  }

  onAddToCartBtnClick() {
    this.showToastMsg = true;
    setTimeout(() => {
      // create a cart service which will add products to cart.
      this.showToastMsg = false;
    }, 1500);
  }
}
