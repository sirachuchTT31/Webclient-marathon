import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CovertJsonPipe } from './pipes/covert-json.pipe';



@NgModule({
  declarations: [
    CovertJsonPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [CovertJsonPipe]
})
export class SharedModule { }
