import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ClientComponent } from './client/client.component';
import { ClientListComponent } from './client-list/client-list.component';
import { CreateClientComponent } from './create-client/create-client.component';

const routes: Routes = [
  { path: '', component: ClientComponent, children:[
    { path: '', component: ClientListComponent },
    { path: 'listar-clientes', component: ClientListComponent },
    { path: 'crear-cliente', component: CreateClientComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {}