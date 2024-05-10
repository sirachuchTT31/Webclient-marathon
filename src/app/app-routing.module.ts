import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ErrorComponent } from './index/component/error/error.component';
import { Error404Component } from './index/component/error/error404/error404.component';
import { AuthPageComponent } from './index/pages/auth-page/auth-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth/login',
  },
  {
    path: 'auth/login',
    component: AuthPageComponent,
  },
  { path: 'back-office', loadChildren: () => import('./index/modules/back-office/back-office.module').then(m => m.BackOfficeModule) },
  { path: 'user', loadChildren: () => import('./index/modules/user/user.module').then(m => m.UserModule) },
  { path: '**', component: ErrorComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
