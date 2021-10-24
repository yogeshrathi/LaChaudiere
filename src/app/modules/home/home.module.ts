import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeRoutingModule, routes } from './home-routing.module';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { InformationComponent } from './information/information.component';
import { PortalComponent } from './portal/portal.component';

@NgModule({
  declarations: [
    HomeComponent,
    InformationComponent,
    PortalComponent,
    ProductsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
