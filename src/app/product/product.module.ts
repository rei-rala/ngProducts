import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductList } from './product-list/product-list.component';
import { ShowProduct } from './product-list/show-product-mini/show-product-mini.component';
import { ProductDetailGuard } from './product-detail/product-detail.guard';
import { RouterModule } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProductList, ShowProduct, ProductDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'products', component: ProductList, pathMatch: 'full' },
      {
        path: 'products/:id',
        canActivate: [ProductDetailGuard],
        component: ProductDetailComponent,
      },
    ]),
  ],
})
export class ProductModule {}
