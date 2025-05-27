import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit{
  cartData: any;
  paymentSuccess: boolean = false;
  paymentConfirmed: boolean = false;
  userProfile: any;
  isLoggedIn: boolean | null = false;
  addresses: any;

  constructor(private router: Router, private service: CustomerService) {
    const navigation = this.router.getCurrentNavigation();
    this.cartData = navigation?.extras?.state;
    this.cartData = this.cartData?.cartData
    console.log(this.cartData)
  }

  ngOnInit(): void {
    this.getUserProfile();
    const userId = this.userProfile.loginUser.customerId;
    this.service.getAddresses(userId).subscribe((response) => {
      this.addresses = response;
      console.log(this.addresses);
    })
  }

  getUserProfile(): any {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (this.isLoggedIn === null) {
      this.isLoggedIn = false;
    }
    if (this.isLoggedIn === true) {
      this.userProfile = JSON.parse(localStorage.getItem('user') || '{}');
    }
  }

  getSubtotal(): number {
    return this.cartData?.reduce((sum: number, item: any) => sum + (item.price * item.stock), 0) || 0;
  }

  getTotalItems(): number {
    return this.cartData?.reduce((sum: number, item: any) => sum + item.stock, 0) || 0;
  }

  simulatePayment(): void {
    // In a real app, this would be replaced with actual payment processing
    this.paymentSuccess = true;
    
    // Simulate payment processing delay
    setTimeout(() => {
      this.router.navigate(['/orders'], { 
        state: { 
          orderSuccess: true,
          orderItems: this.cartData,
          orderTotal: this.getSubtotal()
        }
      });
    }, 2000);
  }
}