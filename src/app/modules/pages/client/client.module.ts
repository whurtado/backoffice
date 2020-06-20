import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client/client.component';
import { ClientRoutingModule } from './client-routing.module';
import { ClientListComponent } from './client-list/client-list.component';



@NgModule({
  declarations: [ClientComponent, ClientListComponent],
  imports: [
    CommonModule,
    ClientRoutingModule
  ]
})
export class ClientModule { }
