import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    NavBarComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
  ],
  exports: [
    // ComponentModule,
    NavBarComponent,
    HeaderComponent,
  ]
})
export class ComponentModule { }
