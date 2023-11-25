import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ErrorComponent } from './index/component/error/error.component';
import { Error404Component } from './index/component/error/error404/error404.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    // children: [
    //   {
    //     path: '404',
    //     component: ErrorComponent
    //   },
    //   { path: '', redirectTo: '404', pathMatch: 'full' },
    //   { path: '**', redirectTo: '404', pathMatch: 'full' },
    // ]
  },
  // {
  //   path: '404',
  //   component: ErrorComponent
  // },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
