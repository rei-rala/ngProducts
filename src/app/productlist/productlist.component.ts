import { Component, OnInit } from '@angular/core';
import { ProductListService } from './productlist.service';

export interface IProduct {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
}

@Component({
  selector: 'product-list',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.scss'],
})
export class ProductList implements OnInit {
  constructor(private plService: ProductListService) {}
  private _inputFilter = '';

  private _productList: IProduct[] = [];
  filteredProducts: IProduct[] = [];

  productPreview?: IProduct;
  showPreview = true;

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

  ngOnInit(): void {
    this.plService.getProducts().subscribe(
      (response) => {
        this._productList = response;
      },
      (error) => {
        console.warn(`Error getting products:\n${error}`);
        this._productList = [];
      },
      () => {
        this.filteredProducts = this.productList;
      }
    );
  }
}
