import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
// import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { NgxSpinnerModule } from "ngx-spinner";

import { BrowserModule } from '@angular/platform-browser';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { CovertJsonPipe } from './pipe/covert-json.pipe';
// import { CovertTimezonePipe } from './pipe/covert-timezone.pipe';

@NgModule({
  declarations: [
    IndexComponent,
    AuthPageComponent,
    // CovertJsonPipe,
    // CovertTimezonePipe,
  ],
  imports: [
    FormsModule,
    CommonModule,
    IndexRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,

  ],

  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    // { provide: NgbDropdownModule }
  ],

})
export class IndexModule {

}
