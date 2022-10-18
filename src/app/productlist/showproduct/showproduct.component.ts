import { Component, Input } from '@angular/core';
import type { Product } from '../productlist.component';


@Component({
  templateUrl: './showproduct.component.html',
  selector: 'showproduct',
})
export class ShowProduct {
  @Input() private _product!: Product;
  showingImage = false;

  get product()  {
    return this._product
  }

  toggleImage() {
    this.showingImage = !this.showingImage
  }
}
