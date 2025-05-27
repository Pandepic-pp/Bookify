import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-search-book',
  templateUrl: './search-book.component.html',
  styleUrls: ['./search-book.component.css'],
})
export class SearchBookComponent implements OnInit {
  query: string = '';
  isLoggedIn: boolean | null = false;
  userProfile: any[] = [];
  books: any;
  demoBook: any = [
    {
      Title: 'The Concept of "God"',
      ImageLinks: {
        smallThumbnail:
          'http://books.google.com/books/content?id=KhtKDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
        thumbnail:
          'http://books.google.com/books/content?id=KhtKDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      },
      Authors: ['Vinoth'],
      Price: 45,
    },
  ];
  constructor(
    private service: CustomerService,
    private route: ActivatedRoute,
    private router: Router,
    private sharedSvc: SharedService
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.query = params['results'];
    });
    this.books = this.service.books;
    this.books = this.filterBooks();
    //console.log(this.books);
    // console.log(this.books[0]['ImageLinks']?.smallThumbnail);
    //this.books = this.demoBook;
  }

  getUser(){
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if(this.isLoggedIn === null){
      this.isLoggedIn = false;
    }
    if(this.isLoggedIn === true){
      this.userProfile = JSON.parse(localStorage.getItem('user') || '{}');
    }
  }

  sort(type: string) {
    if (type === 'lowToHigh') {
      this.books.sort((a: any, b: any) => a.Price - b.Price); // Sort by price low to high
    } else if (type === 'highToLow') {
      this.books.sort((a: any, b: any) => b.Price - a.Price); // Sort by price high to low
    }
  }

  filterBooks(): any[] {
    if (!this.query) {
      return this.books; // Return all books if the query is empty
    }

    const lowerCaseQuery = this.query.toLowerCase();

    return this.books.filter((book: any) => {
      // Check if the query matches the title
      const matchesTitle = book.Title.toLowerCase().includes(lowerCaseQuery);

      // Check if the query matches any category
      const matchesCategory = book.Categories.some((category: any) =>
        category.toLowerCase().includes(lowerCaseQuery)
      );

      // Check if the query matches any author
      const matchesAuthor = book.Authors.some((author: any) =>
        author.toLowerCase().includes(lowerCaseQuery)
      );

      // Return true if the query matches any of the fields
      return matchesTitle || matchesCategory || matchesAuthor;
    });
  }

  goToSearchBook() {
    this.sharedSvc.onlyBookster = true;
    this.sharedSvc.refresh();
    this.navigate('/bookster');
  }

  navigate(path: string) {
    this.router.navigate([`/${path}`]);
  }

  updateCart(book: any) {
    console.log('Before:', book);

    // Transform book object to match API expectations
    let bookCopy = {
      itemId: book.itemId || 0,
      customerId: 1, // Since StoreId maps to customerId
      bookId: book.BookId || 0,
      stock: book.AvailableStock || 0,
      price: book.Price || 0,
      title: book.Title || '',
      authors: Array.isArray(book.Authors)
        ? book.Authors.join(', ')
        : book.Authors || '',
      categories: Array.isArray(book.Categories)
        ? book.Categories.join(', ')
        : book.Categories || '',
      description: book.Description || '',
      imageLinks:
        typeof book.ImageLinks === 'object'
          ? JSON.stringify(book.ImageLinks)
          : book.ImageLinks || '',
      industryIdentifier:
        typeof book.IndustryIdentifier === 'object'
          ? JSON.stringify(book.IndustryIdentifier)
          : book.IndustryIdentifier || '',
      language: book.Language || '',
      pageCount: book.PageCount || 0,
      averageRating: book.AverageRating || 0,
      ratingsCount: book.RatingsCount || 0,
    };

    console.log('Transformed Book:', bookCopy);

    this.service.updateCart(bookCopy).subscribe((response) => {
      console.log('Response:', response);
    });
  }
}
