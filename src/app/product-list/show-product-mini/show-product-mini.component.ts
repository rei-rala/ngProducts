import { Component, Input } from '@angular/core';
import type { IProduct } from '../product-list.component';

@Component({
  selector: 'show-product',
  templateUrl: './show-product-mini.component.html',
  styleUrls: ['./show-product-mini.component.scss'],
})
export class ShowProduct {
  @Input() showPreview!: boolean;
  @Input() product!: IProduct;
  showingImage = false;

  toggleImage() {
    this.showingImage = !this.showingImage;
  }
}
