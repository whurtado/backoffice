import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages/pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '', component: PagesComponent, children: [
      { path: '', component: DashboardComponent},
      { path: 'dashboard', component: DashboardComponent},
      { path: 'cliente', loadChildren: () => import('./client/client.module').then(m => m.ClientModule) },

    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
