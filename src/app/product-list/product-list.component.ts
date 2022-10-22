import { ThisReceiver } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductListService } from './product-list.service';

export interface IProduct {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
}

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductList implements OnInit, OnDestroy {
  constructor(private plService: ProductListService) {}
  private _inputFilter = '';

  private _productList: IProduct[] = [];
  filteredProducts: IProduct[] = [];

  productPreview?: IProduct;
  showPreview = true;
  loading = true;

  sub!: Subscription;

  get productList() {
    return this._productList;
  }

  get inputFilter() {
    return this._inputFilter;
  }

  set inputFilter(newFilter: string) {
    this._inputFilter = newFilter.trim();

    if (this._inputFilter.length > 0) {
      this.filteredProducts = this.performFilter(
        this._inputFilter.toUpperCase()
      );
    } else {
      this.filteredProducts = this.productList;
    }
  }

  performFilter(filterValue: any): IProduct[] {
    return this.productList.filter((p) => {
      for (let value of Object.values(p)) {
        let upperValue = String(value).toUpperCase();
        if (upperValue.includes(filterValue)) {
          return true;
        }
      }
      return false;
    });
  }

  setProductPreview(newProduct?: IProduct) {
    this.productPreview = newProduct;
  }

  clearProductPreview() {
    this.setProductPreview(undefined);
  }

  ngOnInit() {
    new Promise((res) => {
      console.log('Retrieving data');
      return setTimeout(res, 2000);
    }).then(() => {
      this.sub = this.plService.getProducts().subscribe({
        next: (products) => (this._productList = products),
        error: console.log,
        complete: () => {
          this.filteredProducts = this.productList;
          this.loading = false;
        },
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
