import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmtpServerComponent } from './smtp-server/smtp-server.component';
import { SmtpServerFormComponent } from './smtp-server-form/smtp-server-form.component';
import { SmtpSerberRoutingModule } from './smtp-server-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SmtpServerComponent, 
    SmtpServerFormComponent
  ],
  imports: [
    CommonModule,
    SmtpSerberRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SmtpServerModule { }
