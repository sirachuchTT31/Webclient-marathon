import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardIndexContentComponent } from './admin/admin-dashboard/dashboard-index-content/dashboard-index-content.component';
import { DashboardPaymentContentComponent } from './admin/admin-dashboard/dashboard-payment-content/dashboard-payment-content.component';
import { DashboardReportContentComponent } from './admin/admin-dashboard/dashboard-report-content/dashboard-report-content.component';
import { AdminContentComponent } from './admin/admin-dashboard/dashboard-basic-content/admin-content/admin-content.component';
import { OrganizerContentComponent } from './admin/admin-dashboard/dashboard-basic-content/organizer-content/organizer-content.component';
import { MemberContentComponent } from './admin/admin-dashboard/dashboard-basic-content/member-content/member-content.component';
import { LocationContentComponent } from './admin/admin-dashboard/dashboard-basic-content/location-content/location-content.component';
import { ApproverPaymentComponent } from './admin/admin-dashboard/approver-menu-content/approver-payment/approver-payment.component';
import { ApproverRunningComponent } from './admin/admin-dashboard/approver-menu-content/approver-running/approver-running.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { ApproverOrganizerComponent } from './admin/admin-dashboard/approver-menu-content/approver-organizer/approver-organizer.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../../services/auth.guard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';

const routes: Routes = [
  {
    path: 'dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuardService]
  },
  // {
  //   path: 'admin',
  //   component: AdminContentComponent,
  //   canActivate: [AuthGuardService]
  // },
  // {
  //   path: 'organizer',
  //   component: OrganizerContentComponent,
  //   canActivate: [AuthGuardService]
  // },
  // {
  //   path: 'member',
  //   component: MemberContentComponent,
  //   canActivate: [AuthGuardService]
  // },
  // {
  //   path: 'approved-running',
  //   component: ApproverRunningComponent,
  //   canActivate: [AuthGuardService]
  // },
  // {
  //   path: 'approved-organizer',
  //   component: ApproverOrganizerComponent,
  //   canActivate: [AuthGuardService]
  // }
]

@NgModule({
  declarations: [
    DashboardIndexContentComponent,
    DashboardPaymentContentComponent,
    DashboardReportContentComponent,
    AdminContentComponent,
    OrganizerContentComponent,
    MemberContentComponent,
    LocationContentComponent,
    AdminDashboardComponent,
    ApproverRunningComponent,
    ApproverPaymentComponent,
    ApproverOrganizerComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatSlideToggleModule,
    MatTooltipModule,
    RouterModule.forChild(routes),
  ]
})
export class BackOfficeModule { }
