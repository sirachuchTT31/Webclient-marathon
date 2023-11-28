import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { AuthGuardService } from './services/auth.guard';
import { ErrorComponent } from './component/error/error.component';
import { AdminContentComponent } from './pages/admin/admin-dashboard/dashboard-basic-content/admin-content/admin-content.component';

const routes: Routes = [{
  path: '',
  component: IndexComponent, children: [
    {
      path: 'auth/login',
      component: AuthPageComponent
    },
    {
      path: 'admin/dashboard',
      component: AdminDashboardComponent,
      canActivate: [AuthGuardService]
    },
    // {
    //   path: '404',
    //   component: ErrorComponent
    // },
    // { path: '', redirectTo: '404', pathMatch: 'full' },
    // { path: '**', redirectTo: '404', pathMatch: 'full' },
  ]
},
{ path: '**', pathMatch: 'full', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule { }
