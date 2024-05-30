import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginationOrderMemberComponent } from './pagination/pagination-order-member/pagination-order-member.component';
import { PaginationApprovedOrganizerComponent } from './pagination/pagination-approved-organizer/pagination-approved-organizer.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RemoveIconComponent } from './remove-icon/remove-icon.component';
import { ModalListRegisterComponent } from './modal-list-register/modal-list-register.component';

@NgModule({
  declarations: [
    NavBarComponent,
    HeaderComponent,
    PaginationOrderMemberComponent,
    PaginationApprovedOrganizerComponent,
    RemoveIconComponent,
    ModalListRegisterComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    NgxPaginationModule,
  ],
  exports: [
    // ComponentModule,
    NavBarComponent,
    HeaderComponent,
    PaginationOrderMemberComponent,
    RemoveIconComponent
  ]
})
export class ComponentModule { }
