import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { HeaderComponent } from './component/header/header.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { ListMenuComponent } from './pages/list-menu/list-menu.component';



@NgModule({
  declarations: [
    IndexComponent,
    NavBarComponent,
    HeaderComponent,
    AuthPageComponent,
    ListMenuComponent

  ],
  imports: [
    CommonModule,
    IndexRoutingModule
  ]
})
export class IndexModule { }
