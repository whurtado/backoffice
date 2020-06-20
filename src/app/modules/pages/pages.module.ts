import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages/pages.component';
import { LayoutModule } from '../layout/layout.module';
import { ClientModule } from './client/client.module';


@NgModule({
  declarations: [DashboardComponent, PagesComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    ClientModule
  ]
})
export class PagesModule { }
