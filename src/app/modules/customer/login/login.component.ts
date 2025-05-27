import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  isEmailCorrect: boolean = false;

  constructor(private fb: FormBuilder, private service: CustomerService, private router: Router) {}
  form = this.fb.group({
    email: ['']
  });

  otpLogin = this.fb.group({
    email: [''],
    otp: ['']
  })

  Login(form: any){
    this.service.loginCustomer(form.value).subscribe({
      next: (res) => {
        console.log(res);
        this.isEmailCorrect = true;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  LoginOtp(form: any){
    form.value.email = this.form.value.email;

    this.service.verifyLoginOtp(form.value).subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem('user', JSON.stringify(res));
        localStorage.setItem('isLoggedIn', 'true');
        this.service.refresh();
        this.router.navigate(['/bookster']);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
