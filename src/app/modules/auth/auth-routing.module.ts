import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AuthComponent} from './auth/auth.component';
import {LoginComponent} from './login/login.component';
import {RecoverPasswordComponent} from './recover-password/recover-password.component';


const routes: Routes = [
  {
    path: '', component: AuthComponent, children: [
      {path: '', component: LoginComponent},
      {path: 'recover-password', component: RecoverPasswordComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
