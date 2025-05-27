import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/bookster', pathMatch: 'full' },
  {
    path: 'bookster',
    loadChildren: () =>
      import('./modules/customer/customer.module').then(
        (m) => m.CustomerModule
      ),
  },
  {
    path: 'business',
    loadChildren: () =>
      import('./modules/store/store.module').then((m) => m.StoreModule),
  },
  {
    path: 'delivery',
    loadChildren: () =>
      import('./modules/delivery/delivery.module').then(
        (m) => m.DeliveryModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
