import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';

const routes: Routes = [{
  path: '',
  component: IndexComponent, children: [
    {
      path: 'login',
      component: AuthPageComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule { }
