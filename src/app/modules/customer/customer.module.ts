import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddressComponent } from './address/address.component';
import { SharedModule } from '../shared/shared.module';
import { SearchBookComponent } from './search-book/search-book.component';
import { CartComponent } from './cart/cart.component';
import { BuyComponent } from './buy/buy.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'address',
    component: AddressComponent
  },
  {
    path: 'results',
    component: SearchBookComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'checkout',
    component: BuyComponent
  }
];

@NgModule({
  declarations: [CustomerComponent, RegisterComponent, LoginComponent, AddressComponent, SearchBookComponent, CartComponent, BuyComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule, SharedModule],
  providers: []
})
export class CustomerModule {}
