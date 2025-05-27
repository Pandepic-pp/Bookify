import { FormatWidth } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-searched-books',
  templateUrl: './searched-books.component.html',
  styleUrls: ['./searched-books.component.css'],
})
export class SearchedBooksComponent implements OnInit {
  books: any[] = [];
  url: any;
  isAddBook: boolean = false;
  isEdit: boolean = false;
  userProfile: any;

  constructor(
    private service: StoreService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.refresh();
  }

  ngOnInit(): void {
    this.service.url = true;
    this.service.refresh();
    this.books = [];
  }

  form = this.fb.group({
    bookId: [''],
    storeId: [''],
    title: [''],
    authors: this.fb.array([]),
    price: [''],
    availableStock: [''],
    categories: this.fb.array([]),
    description: [''],
    imageLinks: this.fb.group({smallThumbnail: [''], thumbnail: ['']}),
    industryIdentifiers: this.fb.array([]),
    language: [''],
    pageCount: [''],
    averageRating: [''],
    ratingsCount: [''],
  });

  refresh() {
    this.userProfile = JSON.parse(localStorage.getItem('user') || '{}');
    this.service.isStoreSearchChange.subscribe((status) => {
      if (status === true) {
        this.books = this.service.storeSearchBooks.map((item: any) => ({
          bookId: item.volumeInfo.bookId || 0,
          storeId: item.volumeInfo.storeId || this.userProfile.loginStore.storeId,
          authors: item.volumeInfo?.authors || [],
          categories: item.volumeInfo?.categories || [],
          title: item.volumeInfo?.title || 'No Title',
          description: item.volumeInfo?.description || 'No description',
          imageLinks:
            item.volumeInfo?.imageLinks || {},
          industryIdentifiers: item.volumeInfo?.industryIdentifiers || [],
          language: item.volumeInfo.language || 'Unknown',
          pageCount: item.volumeInfo.pageCount || 0,
          averageRating: item.volumeInfo.averageRating || null,
          ratingsCount: item.volumeInfo.ratingsCount || null,
        }));
      }
    });
  }

  AddBook() {
    this.isAddBook = true;
  }

  Cancel() {
    this.isAddBook = false;
  }

  onClick(book: any) {
    console.log(book);
    this.isAddBook = true;
    this.form.patchValue(book);
    this.authors.clear();
    this.categories.clear();
    this.industryIdentifiers.clear();
    book.authors.forEach((value: any) => {
      this.authors.push(this.fb.control(value));
    });
    book.categories.forEach((value: any) => {
      this.categories.push(this.fb.control(value));
    });
    book.industryIdentifiers.forEach((value: any) => {
      this.industryIdentifiers.push(this.fb.group(value));
    });
  }

  get authors(): FormArray {
    return this.form.get('authors') as FormArray;
  }

  get categories(): FormArray {
    return this.form.get('categories') as FormArray;
  }

  get industryIdentifiers(): FormArray {
    return this.form.get('industryIdentifiers') as FormArray;
  }

  addAuthor() {
    this.authors.push(this.fb.control('')); // Add a new author input
  }

  removeAuthor(index: number) {
    this.authors.removeAt(index); // Remove an author input
  }

  submitForm(form: any) {
    console.log(form.value); // Log form data on submit
    if(this.isEdit === false){
      this.AddNewBook(form)
    }
    this.form.reset();
    this.isAddBook = false;
  }

  AddNewBook(form: any){
    this.service.addBookToInventory(form.value).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
