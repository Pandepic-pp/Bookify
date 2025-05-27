import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SearchedBooksComponent } from './searched-books/searched-books.component';

const routes: Routes = [
  { path: '', component: StoreComponent },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'add-book',
    component: SearchedBooksComponent
  }
];

@NgModule({
  declarations: [StoreComponent, RegisterComponent, LoginComponent, SearchedBooksComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule, SharedModule],
})
export class StoreModule {}
