import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

interface UserProfile {
  loginUser: {
    customerId: number;
    // Add other properties as needed
  };
  // Add other properties as needed
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: any[] = [];
  userProfile: UserProfile | null = null;
  isLoggedIn: boolean = false;

  constructor(private service: CustomerService, private router: Router) {}

  ngOnInit(): void {
    this.getUser();

    if (this.isLoggedIn && this.userProfile?.loginUser?.customerId) {
      const userId = this.userProfile.loginUser.customerId;
      this.service.getCart(userId).subscribe((response: any) => {
        this.cart = this.mapCartItems(response, userId);
        console.log(this.cart);
      });
    }
  }

  private mapCartItems(items: any[], userId: number): any[] {
    return items.map((book: any) => ({
      itemId: book.itemId || 0,
      customerId: userId, // Since StoreId maps to customerId
      bookId: book.bookId || 0,
      stock: book.stock || 0,
      price: book.price || 0,
      title: book.title || '',
      authors: Array.isArray(book.authors)
        ? book.authors.join(', ')
        : book.authors || '',
      categories: Array.isArray(book.categories)
        ? book.categories.join(', ')
        : book.categories || '',
      description: book.description || '',
      imageLinks:
        typeof book.imageLinks === 'string'
          ? JSON.parse(book.imageLinks)
          : book.imageLinks || '',
      industryIdentifier:
        typeof book.industryIdentifier === 'string'
          ? JSON.parse(book.industryIdentifier)
          : book.industryIdentifier || '',
      language: book.language || '',
      pageCount: book.pageCount || 0,
      averageRating: book.averageRating || 0,
      ratingsCount: book.ratingsCount || 0,
    }));
  }

  getUser(): void {
    const loggedIn = localStorage.getItem('isLoggedIn');
    this.isLoggedIn = loggedIn === 'true';

    if (this.isLoggedIn) {
      const user = localStorage.getItem('user');
      this.userProfile = user ? JSON.parse(user) : null;
    } else {
      this.userProfile = null;
    }
  }

  // Add these to your CartComponent class
  getSubtotal(): number {
    return this.cart.reduce(
      (sum, item) => sum + (item.price * item.stock || 0),
      0
    );
  }

  removeFromCart(itemId: number): void {
    console.log(itemId);
    this.service.removeItem(itemId).subscribe({
      next: () => {
        this.cart = this.cart.filter((item) => item.itemId !== itemId);
      },
      error: (err) => {
        console.error('Error removing item:', err);
      },
    });
  }

  checkoutAll() {
    this.router.navigate(['/bookster/checkout'], {
      state: {
        cartData: this.cart,
      },
    });
  }

  checkoutOne(book: any) {
    this.router.navigate(['/bookster/checkout'], {
      state: {
        cartData: [book],
      },
    });
  }

  getTotalItems(): number {
    return (
      this.cart?.reduce((sum: number, item: any) => sum + item.stock, 0) || 0
    );
  }
}
