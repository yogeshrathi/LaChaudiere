import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortalComponent } from './portal/portal.component';

const routes: Routes = [
  {
    path: '',
    component: PortalComponent,
    children: [
      {
        path: 'portal',
        loadChildren: () => import('./portal/portal.module').then(m => m.PortalModule)
      },
      {
        path: 'information',
        loadChildren: () => import('./information/information.module').then(m => m.InformationModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
