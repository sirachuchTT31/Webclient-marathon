import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-list-register',
  templateUrl: './modal-list-register.component.html',
  styleUrls: ['./modal-list-register.component.scss']
})
export class ModalListRegisterComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
}
