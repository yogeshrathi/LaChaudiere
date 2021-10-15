import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { InformationComponent } from './information.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: InformationComponent, children: [] }
  ])
  ]
})
export class InformationModule { }
