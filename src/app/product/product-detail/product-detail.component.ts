import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduct } from '../product-list/product-list.component';
import { ProductListService } from '../product-list/product-list.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  sub?: Subscription;
  product?: IProduct;

  productId = this.route.snapshot.paramMap.get('id');
  timeoutMS = 5000;

  error?: { code: number; message: string };
  timeout?: NodeJS.Timeout = setTimeout(() => {
    if (!this.product) {
      this.error = {
        code: 408,
        message: `${this.timeoutMS}ms timeout`,
      };
    }
  }, this.timeoutMS);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private plService: ProductListService
  ) {}

  onBack(): void {
    this.router.navigate(['/products']);
  }

  ngOnInit(): void {
    this.sub = this.plService
      .getProduct(+this.productId!)
      .subscribe((product) => {
        if (product) {
          this.product = product;
        } else {
          this.error = {
            code: 404,
            message: `Product ${this.productId} not found`,
          };
        }
        clearTimeout(this.timeout!);
      });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    clearTimeout(this.timeout!);
  }
}
