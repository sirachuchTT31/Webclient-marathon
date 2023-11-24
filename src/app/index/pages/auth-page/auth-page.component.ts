import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent {
  login_form: FormGroup
  register_form: FormGroup
  constructor() {
    this.login_form = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    })
    this.register_form = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
      name: new FormControl(''),
      lastname: new FormControl(''),
      email: new FormControl(''),
    })
  }
}
