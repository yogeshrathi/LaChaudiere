import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { PortalComponent } from './portal/portal.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductsComponent } from './products/products.component';
import { CustomersComponent } from './customers/customers.component';
import { LightboxModule } from 'ngx-lightbox';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AdminComponent,
    PortalComponent,
    ProductsComponent,
    CustomersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    Ng2SearchPipeModule,
    LightboxModule,
    SharedModule,
    TranslateModule
  ]
})
export class AdminModule { }
