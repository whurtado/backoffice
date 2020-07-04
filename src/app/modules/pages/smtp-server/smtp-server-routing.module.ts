import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SmtpServerFormComponent } from './smtp-server-form/smtp-server-form.component';

const routes: Routes = [
  { path: '', component: SmtpServerFormComponent, children:[
    { path: '', component: SmtpServerFormComponent },
    { path: 'configurar-servidor-smtp', component: SmtpServerFormComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SmtpSerberRoutingModule {}
