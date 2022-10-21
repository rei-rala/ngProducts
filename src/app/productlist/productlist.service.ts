import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class ProductListService {
  private _productsUrl = '/assets/db/products.json'
  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get(this._productsUrl)
  }
}
