import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { AuthGuardService } from './services/auth.guard';
import { ErrorComponent } from './component/error/error.component';
const routes: Routes = [{
  path: '',
  component: IndexComponent,
   children: [
    {
      path: 'auth/login',
      component: AuthPageComponent
    },
    {path : 'back-office',loadChildren : () => import('../index/modules/back-office/back-office.module').then(m => m.BackOfficeModule)},
    {path : 'user' ,loadChildren : () => import('../index/modules/user/user.module').then(m => m.UserModule)}
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
