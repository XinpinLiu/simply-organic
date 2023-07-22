import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent {
  currentProduct: Product = {
    name: '',
    description: '',
    published: false,
    category: '',
  };

  message = '';
  categories: Category[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.productService.get(id).subscribe((product) => {
      this.currentProduct.id = id;
      this.currentProduct.name = product.name;
      this.currentProduct.description = product.description;
      this.currentProduct.published = product.published;
      this.currentProduct.category = product.category;
    });
    this.categoryService.getAll().subscribe((categories) => {
      this.categories = categories;
    });
  }

  updatePublished(status: boolean): void {
    const data = {
      name: this.currentProduct.name,
      description: this.currentProduct.description,
      category: this.currentProduct.category,
      published: status,
    };

    this.message = '';

    this.productService.update(this.currentProduct.id, data).subscribe({
      next: (res) => {
        console.log(res);
        this.currentProduct.published = status;
        this.message = res.message
          ? res.message
          : 'The status was updated successfully!';
      },
      error: (e) => console.error(e),
    });
  }

  updateProduct(): void {
    this.message = '';

    this.productService
      .update(this.currentProduct.id, this.currentProduct)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message
            ? res.message
            : 'This product was updated successfully!';
        },
        error: (e) => console.error(e),
      });
  }

  deleteProduct(): void {
    this.productService.delete(this.currentProduct.id).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/products']);
      },
      error: (e) => console.error(e),
    });
  }
}
