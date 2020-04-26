import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';



@NgModule({
  declarations: [FooterComponent, HeaderComponent, SideNavComponent],
  imports: [
    CommonModule
  ]
})
export class LayoutModule { }
