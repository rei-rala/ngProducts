import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IProduct } from './product-list.component';

@Injectable({
  providedIn: 'root',
})
export class ProductListService {
  private _productsUrl = '/assets/db/products.json';
  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this._productsUrl);
  }

  getProduct(id: number): Observable<IProduct | null> {
    const full = this.getProducts();

    return full.pipe(
      map((products) => products.find((p) => p.id === id) ?? null)
    );
  }
}
