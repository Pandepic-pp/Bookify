import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  isVerification: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private service: CustomerService
  ) {}

  verificationForm = this.fb.group({
    email: [''],
    gender: [''],
    dateOfBirth: [''],
    phone: [''],
    otp: [''],
  });

  form = this.fb.group({
    email: [''],
    gender: [''],
    dateOfBirth: [''],
    phone: [''],
  });

  Register(form: any) {
    console.log(form.value);
    this.service.registerCustomer(form.value).subscribe({
      next: (res) => {
        console.log(res);
        this.service.registerForm = form.value;
        this.isVerification = true;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  VerifyEmail(verificationForm: any) {
    verificationForm.value.email = this.form.value.email;
    verificationForm.value.gender = this.form.value.gender;
    verificationForm.value.dateOfBirth = this.form.value.dateOfBirth;
    verificationForm.value.phone = this.form.value.phone;

    this.service.verifyRegisterOtp(verificationForm.value).subscribe({
      next: (res) => {
        console.log('verification successful');
        this.router.navigate(['/bookster/login']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
