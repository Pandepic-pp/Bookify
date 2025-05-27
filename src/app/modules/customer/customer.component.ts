import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  url: string = 'https://www.googleapis.com/books/v1/volumes?q=';
  books: any;
  juvenileFictionBooks: any;
  philosophy: any;

  constructor(
    private service: CustomerService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.service.getAllBooks().subscribe((response) => {
      this.books = Object.values(response);
      //console.log(this.books);
      this.books = this.books.map((item: any) => ({
        ...item,
        ImageLinks:
          typeof item.ImageLinks === 'string'
            ? JSON.parse(item.ImageLinks)
            : item.ImageLinks,
        Authors:
          typeof item.Authors === 'string'
            ? JSON.parse(item.Authors)
            : item.Authors,
        Categories:
          typeof item.Categories === 'string'
            ? JSON.parse(item.Categories)
            : item.Categories,
        IndustryIdentifier:
          typeof item.IndustryIdentifier === 'string'
            ? JSON.parse(item.IndustryIdentifier)
            : item.IndustryIdentifier,
      }));
      this.service.books = this.books;

      //console.log(this.books);
      this.juvenileFictionBooks = this.books.filter((item: any) =>
        item.Categories.includes('Juvenile Fiction')
      );

      // ✅ Filter for Classics
      this.philosophy = this.books.filter((item: any) =>
        item.Categories.includes('Philosophy')
      );

      //console.log("Juvenile Fiction Books:", this.juvenileFictionBooks);
      //console.log("Classics:", this.philosophy);
    });
    this.service.isSearchBookChange.subscribe((status) => {
      if (status === true) {
        this.router.navigate(['/bookster/results'], {
          queryParams: { results: this.service.searchBook },
        });
      }
    });
  }
}
