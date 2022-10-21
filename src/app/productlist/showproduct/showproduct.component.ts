import { Component, Input } from '@angular/core';
import type { IProduct } from '../productlist.component';

@Component({
  selector: 'show-product',
  templateUrl: './showproduct.component.html',
  styleUrls: ['./showproduct.component.scss',]
})
export class ShowProduct {
  @Input() showPreview!: boolean;
  @Input() product!: IProduct;
  showingImage = false;

  toggleImage() {
    this.showingImage = !this.showingImage;
  }
}
