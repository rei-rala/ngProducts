import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ProductList } from './product-list/product-list.component';
import { ShowProduct } from './product-list/show-product-mini/show-product-mini.component';
import { ProductDetailComponent } from './product-list/product-detail/product-detail.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductList,
    ShowProduct,
    ProductDetailComponent,
    WelcomeComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: WelcomeComponent, pathMatch: 'full' },
      { path: 'products', component: ProductList, pathMatch: 'full' },
      { path: 'products/:id', component: ProductDetailComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' },
      { path: '', redirectTo: '', pathMatch: 'full' },

    ]),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
