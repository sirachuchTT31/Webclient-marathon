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
import { DatePickerRangeComponent } from './date-picker-range/date-picker-range.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    NavBarComponent,
    HeaderComponent,
    PaginationOrderMemberComponent,
    PaginationApprovedOrganizerComponent,
    RemoveIconComponent,
    ModalListRegisterComponent,
    DatePickerRangeComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    NgxPaginationModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatNativeDateModule,
    MatButtonModule,
    MatInputModule
  ],
  exports: [
    NavBarComponent,
    HeaderComponent,
    PaginationOrderMemberComponent,
    RemoveIconComponent,
    DatePickerRangeComponent
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
})
export class ComponentModule { }
