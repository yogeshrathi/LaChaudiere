import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalComponent } from './portal.component';
import { RouterModule } from '@angular/router';
import { ROUTES } from './portal.route';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PortalComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    SharedModule
  ]
})
export class PortalModule { }