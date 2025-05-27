import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent implements OnInit {
  constructor(private fb: FormBuilder, private service: CustomerService) {}
  userProfile: any;
  isLoggedIn: boolean | null = false;
  address: any;
  isEdit: boolean = false;

  ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (this.isLoggedIn === null) {
      this.isLoggedIn = false;
    }
    if (this.isLoggedIn === true) {
      this.userProfile = JSON.parse(localStorage.getItem('user') || '{}');
    }
    this.refresh();
  }

  refresh() {
    console.log(this.userProfile.loginUser);
    this.service.getAddresses(this.userProfile.loginUser.customerId).subscribe({
      next: (res) => {
        this.address = res;
        console.log(this.address);
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.form.reset();
  }

  form = this.fb.group({
    addressId: [''],
    customerId: [''],
    fullName: [''],
    label: [''],
    phone: [''],
    city: [''],
    state: [''],
    pincode: [''],
    street: [''],
    country: [''],
    isDefaultAddress: [''],
  });

  Address(form: any) {
    form.value.customerId = this.userProfile.loginUser.customerId;
    if (this.isEdit === true) {
      this.UpdateAddress(form);
    } else {
      this.AddAddress(form);
    }
  }

  AddAddress(form: any) {
    console.log(form.value);
    form.value.addressId = 0;
    if (form.value.isDefaultAddress === null) form.value.isDefaultAddress = false;
    this.service.addAddress(form.value).subscribe({
      next: (res) => {
        console.log(res);
        this.refresh();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  UpdateAddress(form: any) {
    console.log(form.value);
    this.service.updateAddress(form.value).subscribe({
      next: (res) => {
        console.log(res);
        this.refresh()
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  Edit(id: any) {
    console.log(id);
    const selectedAddress = this.address.filter(
      (item: any) => item.addressId === id
    );
    console.log(selectedAddress);
    if (selectedAddress) {
      this.isEdit = true;
      this.form.patchValue(selectedAddress[0]);
    }
  }

  Delete(id: any){
    this.service.deleteAddress(id).subscribe({
      next: (res) => {
        console.log(res);
        this.refresh();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
