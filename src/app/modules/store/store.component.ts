import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
  searchedBooks: any[] = []; // Ensure it's an array
  userProfile: any;
  storeId: any;

  constructor(private service: StoreService, private router: Router) {
    this.userProfile = JSON.parse(localStorage.getItem('user') || '{}');
    if (
      this.userProfile !== undefined &&
      this.userProfile.loginStore !== undefined &&
      this.userProfile.loginStore.storeId !== undefined
    ) {
      this.storeId = this.userProfile.loginStore.storeId;
    }

    this.service.getStoreBooks(this.storeId).subscribe((response: any) => {
      this.searchedBooks = response.map((book: any) => ({
        ...book,
        Author: JSON.parse(book.Author).join(', '), // Convert string to actual array
      }));
      console.log(this.searchedBooks);
    });
  }

  ngOnInit(): void {
    this.searchedBooks = this.service.storeBooks;
    this.service.url = false;
    this.service.refresh();
  }

  AddBook() {
    this.service.url = true;
    this.service.refresh();
    this.router.navigate(['/business/add-book']);
  }
}
