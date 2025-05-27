import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  registerForm: any;
  books: any;
  
  userProfile: any;
  isLoggedIn: boolean | null = false;
  isLoggedInChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  searchBook: any;
  isSearchBook: boolean = false;
  isSearchBookChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private http: HttpClient) {}

  registerUrl: string = 'https://localhost:7023/api/Register/';

  loginUrl: string = 'https://localhost:7023/api/Login/'

  customerUrl: string = 'https://localhost:7023/api/Customer/'

  inventoryUrl: string = 'https://localhost:7023/api/Inventory/'

  cartUrl: string = 'https://localhost:7023/api/Cart/'

  refresh(){
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if(this.isLoggedIn === null){
      this.isLoggedIn = false;
    }
    if(this.isLoggedIn === true){
      this.userProfile = JSON.parse(localStorage.getItem('user') || '{}');
    }
    this.isLoggedInChange.emit(this.isLoggedIn);
    this.isSearchBookChange.emit(this.isSearchBook);
  }

  registerCustomer(form: any) {
    return this.http.post(this.registerUrl + 'register-customer', form, {});
  }

  verifyRegisterOtp(form: any) {
    return this.http.post(this.registerUrl + 'verify-customer-otp', form, {});
  }

  loginCustomer(form: any){
    return this.http.post(this.loginUrl + 'login-customer', form, {});
  }

  verifyLoginOtp(form: any){
    return this.http.post(this.loginUrl + 'verify-customer-otp', form, {}); 
  }

  addAddress(form: any){
    return this.http.post(this.customerUrl + 'add-customer-address', form, {});
  }

  getAddresses(customerId: any){
    return this.http.post(this.customerUrl + 'customer-address', customerId, {});
  }

  updateAddress(form: any){
    return this.http.post(this.customerUrl + 'update-customer-address', form, {});
  }

  deleteAddress(addressId: any){
    return this.http.post(this.customerUrl + 'delete-address', addressId, {});
  }

  getAllBooks(){
    return this.http.get(this.inventoryUrl + 'return-all-books', {})
  }

  updateCart(cart: any){
    return this.http.put(this.cartUrl + 'update-cart', cart, {});
  }

  getCart(customerId: any){
    return this.http.post(this.cartUrl + 'get-cart', customerId, {});
  }

  removeItem(itemId: any){
    console.log(itemId);
    return this.http.post(this.cartUrl + 'remove-cart-item', itemId);
  }
}
