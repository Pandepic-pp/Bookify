import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  registerForm: any;
  userProfile: any;
  isLoggedIn: boolean | null = false;
  isLoggedInChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  storeSearchBooks: any;
  isStoreSearch: boolean = false;
  isStoreSearchChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  storeBooks: any;

  url: boolean = false;
  isUrlChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  addBook: any;
  isAddBook: boolean = false;
  isAddBookChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private http: HttpClient) {}

  registerUrl: string = 'https://localhost:7023/api/Register/';

  loginUrl: string = 'https://localhost:7023/api/Login/';

  googleApiUrl: string = 'https://www.googleapis.com/books/v1/volumes?q=';

  storeUrl: string = 'https://localhost:7023/api/Stores/';

  inventoryUrl: string = 'https://localhost:7023/api/Inventory/';

  replaceSpacesWithPlus(sentence: string): string {
    return sentence.replace(/ /g, '+');
  }

  refresh() {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (this.isLoggedIn === null) {
      this.isLoggedIn = false;
    }
    if (this.isLoggedIn === true) {
      this.userProfile = JSON.parse(localStorage.getItem('user') || '{}');
    }
    this.isStoreSearchChange.emit(this.isStoreSearch);
    this.isUrlChange.emit(this.url);
    this.isAddBookChange.emit(this.isAddBook);
    this.isLoggedInChange.emit(this.isLoggedIn);
    this.isAddBook = false;
  }

  registerStore(form: any) {
    return this.http.post(this.registerUrl + 'register-store', form, {});
  }

  verifyRegisterOtp(form: any) {
    return this.http.post(this.registerUrl + 'verify-store-otp', form, {});
  }

  loginStore(form: any) {
    return this.http.post(this.loginUrl + 'login-store', form, {});
  }

  verifyLoginOtp(form: any) {
    return this.http.post(this.loginUrl + 'verify-store-otp', form, {});
  }

  searchBook(query: string) {
    const queryString = this.replaceSpacesWithPlus(query);
    const apiUrl = `${this.googleApiUrl}${queryString}&maxResults=40`;

    return this.http.get(apiUrl);
  }

  getStoreBooks(storeId: any){
    return this.http.post(this.storeUrl + 'store-inventory', storeId, {})
  }

  addBookToInventory(form: any){
    return this.http.post(this.inventoryUrl + 'add-book', form, {});
  }
}
