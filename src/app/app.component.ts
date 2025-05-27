import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CustomerService } from './services/customer.service';
import { StoreService } from './services/store.service';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomerComponent } from './modules/customer/customer.component';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  isBookster: boolean = false;
  isOnlyBookster: boolean = true;
  isBusiness: boolean = true;
  isCourier: boolean = true;
  isLoggedIn: boolean = false;
  isSearchedBooks: boolean = false;
  url: string = '';


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private storeService: StoreService,
    private fb: FormBuilder,
    private sharedService: SharedService
  ) {}

  searchForm = this.fb.group({
    searchQuery: ['', Validators.required],
  });


  ngOnInit(): void {
    this.setUrlPath();
    console.log(location.pathname);
    this.customerService.isLoggedInChange.subscribe((status) => {
      this.isLoggedIn = status;
    });
    this.storeService.isLoggedInChange.subscribe((status) => {
      this.isLoggedIn = status;
    });
    this.storeService.isUrlChange.subscribe((status) => {
      this.isSearchedBooks = status;
    });
    this.refresh();
    this.sharedService.isOnlyBookster.subscribe((status) => {
      if(status) this.isOnlyBookster = status;
    })
  }

  setUrlPath() {
    this.url = location.pathname.slice(1);
    if (this.url === '') {
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        console.log(user);
        if (user.loginStore && user.loginStore.storeId) {
          this.url = 'business';
        } else if (user.loginUser && user.loginUser.customerId) {
          this.url = 'bookster';
        } else if (user.loginStore.deliveryPartnerId) {
          this.url = 'delivery';
        }
      } else {
        this.url = 'bookster';
      }
    }
    this.moduleChange(this.url);
  }

  refresh() {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (this.isLoggedIn === null) {
      this.isLoggedIn = false;
    }
  }

  moduleChange(moduleName: string) {
    if (this.isLoggedIn === true) {
      if (
        confirm(
          'Switching sections will automatically log you out from the current section. Do you want to continue?'
        )
      ) {
        localStorage.clear();
        this.isLoggedIn = false;
      } else {
        this.url = location.pathname.slice(1);
        if (this.url === '') {
          this.url = 'bookster';
        }
        moduleName = this.url;
      }
    }
    this.isBookster = moduleName.slice(0, 8) !== 'bookster';
    this.isOnlyBookster = moduleName === 'bookster';
    this.isBusiness = moduleName.slice(0, 8) !== 'business';
    this.isCourier = moduleName.slice(0, 8) !== 'delivery';
    if (moduleName.slice(0, 8) !== 'business') {
      this.storeService.url = false;
      this.storeService.refresh();
    }
    this.router.navigate([`/${moduleName}`]);
  }

  Logout() {
    this.url = location.pathname.slice(1, 9);
    localStorage.clear();
    this.router.navigate([`/${this.url}`]);
    this.customerService.refresh();
  }

  Profile() {}

  searchBooks(searchForm: any) {
    if (location.pathname.slice(1, 9) === 'business') {
      this.storeService
        .searchBook(searchForm.value.searchQuery)
        .subscribe((response: any) => {
          this.searchForm.reset();
          this.storeService.storeSearchBooks = response.items;
          this.storeService.isStoreSearch = true;
          this.storeService.refresh();
          this.router.navigate(['/business/add-book']);
        });
    }
    else if(location.pathname.slice(1, 9) === 'bookster'){
      this.customerService.searchBook = searchForm.value.searchQuery;
      this.customerService.isSearchBook = true;
      this.isOnlyBookster = false;
      this.customerService.refresh();
      this.searchForm.reset();
    }
  }

  changeBooksterRoute(){
    this.isOnlyBookster = true;
    this.router.navigate(['/bookster']);
  }
}
