import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from './modules/store/store.module';
import { CustomerModule } from './modules/customer/customer.module';
import { CustomerService } from './services/customer.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './modules/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreService } from './services/store.service';
import { SharedService } from './services/shared.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule,
    CustomerModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [CustomerService, StoreService, SharedService],
  bootstrap: [AppComponent],
})
export class AppModule {}
