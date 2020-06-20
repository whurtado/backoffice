import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ClientComponent } from './client/client.component';
import { ClientListComponent } from './client-list/client-list.component';

const routes: Routes = [
  { path: '', component: ClientComponent, children:[
    { path: '', component: ClientListComponent },
    { path: 'listar-clientes', component: ClientListComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {}
