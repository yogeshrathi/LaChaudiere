import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CustomersComponent } from './customers/customers.component';
import { PortalComponent } from './portal/portal.component';
import { ProductsComponent } from './products/products.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'portal'
      },
      {
        path: 'portal',
        component: PortalComponent
      },
      {
        path: 'products',
        component: ProductsComponent
      },
      {
        path: 'customers',
        component: CustomersComponent
      },
     ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
