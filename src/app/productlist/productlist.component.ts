import { Component, OnInit } from '@angular/core';
import { ProductListService } from './productlist.service';

export interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
}

@Component({
  selector: 'product-list',
  templateUrl: './productlist.component.html',
})
export class ProductList implements OnInit {
  constructor(private plService: ProductListService) {}
  private _productList: Product[] = [];

  get productList() {
    return this._productList;
  }

  ngOnInit(): void {
    this.plService.getProducts().subscribe(
      (response) => {
        this._productList = response;
      },
      (error) => {
        console.warn(`Error getting products:\n${error}`);
        this._productList = [];
      }
    );
  }
}
