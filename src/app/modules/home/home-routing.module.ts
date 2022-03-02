import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';
import { HomeComponent } from './home.component';
import { InformationComponent } from './information/information.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { PortalComponent } from './portal/portal.component';
import { ProductsComponent } from './products/products.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
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
        path: 'information',
        component: InformationComponent
      },
      {
        path: 'products',
        component: ProductsComponent
      },{
        path: 'confirm-order',
        component: ConfirmOrderComponent
      },{
        path: 'order-confirmation',
        component: OrderConfirmationComponent
      },
     ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
