import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingProfileComponent } from './setting-profile/setting-profile.component';
import { UserHistoryComponent } from './user-history/user-history.component';
import { OrganizerDashboardComponent } from './organizer/organizer-dashboard/organizer-dashboard.component';
import { OrganizerIndexComponent } from './organizer/organizer-index/organizer-index.component';
import { ListMenuComponent } from './list-menu/list-menu.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../../services/auth.guard';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
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
import { ComponentModule } from '../../component/component.module';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  MatDialogModule
} from '@angular/material/dialog';

const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        component: ListMenuComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'setting-profile',
        component: SettingProfileComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'history',
        component: UserHistoryComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'organizer-dashboard',
        component: OrganizerDashboardComponent,
        canActivate: [AuthGuardService]
      },
    ]
  },
]


@NgModule({
  declarations: [
    SettingProfileComponent,
    UserHistoryComponent,
    OrganizerDashboardComponent,
    OrganizerIndexComponent,
    ListMenuComponent,
    UserLayoutComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatIconModule,
    Ng2SearchPipeModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatNativeDateModule,
    NgxPaginationModule,
    ComponentModule,
    MatDialogModule,
    MatTooltipModule,
    RouterModule.forChild(routes),
  ]
})
export class UserModule { }
