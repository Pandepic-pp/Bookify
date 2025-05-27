import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  isVerification: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: StoreService,
    private router: Router
  ) {}

  verificationForm = this.fb.group({
    storeName: [''],
    email: [''],
    phone: [''],
    street: [''],
    city: [''],
    state: [''],
    country: [''],
    pincode: [''],
    otp: [''],
  });

  form = this.fb.group({
    storeName: [''],
    email: [''],
    phone: [''],
    street: [''],
    city: [''],
    state: [''],
    country: [''],
    pincode: [''],
  });

  Register(form: any) {
    console.log(form.value);
    this.service.registerStore(form.value).subscribe({
      next: (res) => {
        this.service.registerForm = form.value;
        this.isVerification = true;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  VerifyEmail(verificationForm: any) {
    verificationForm.value.storeName = this.form.value.storeName;
    verificationForm.value.email = this.form.value.email;
    verificationForm.value.phone = this.form.value.phone;
    verificationForm.value.street = this.form.value.street;
    verificationForm.value.city = this.form.value.city;
    verificationForm.value.state = this.form.value.state;
    verificationForm.value.country = this.form.value.country;
    verificationForm.value.pincode = this.form.value.pincode;

    this.service.verifyRegisterOtp(verificationForm.value).subscribe({
      next: (res) => {
        console.log('verification successful');
        this.router.navigate(['/business/login']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
