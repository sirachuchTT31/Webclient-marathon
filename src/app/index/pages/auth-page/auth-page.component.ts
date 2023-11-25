import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthServices } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent {
  login_form: FormGroup
  register_form: FormGroup
  menu = 'login'
  constructor(private authService: AuthServices, private localStorageService: LocalStorageService, private spinner: NgxSpinnerService) {
    this.login_form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
    this.register_form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
    })
  }
  changeMenu(menu: any,) {
    this.menu = menu
  }
  checkLogin() {
    if (this.login_form.valid == true) {
      return true
    }
    else {
      return false
    }
  }
  Login() {
    if (this.login_form.valid === true) {
      this.spinner.show()
      let param = {
        username: this.login_form.controls['username'].value,
        password: this.login_form.controls['password'].value
      }
      this.authService.postLogin(param).subscribe((rs) => {
        if (rs?.status == true) {
          let response_payload = rs.result.payload
          this.localStorageService.setProfile(response_payload.name, response_payload.lastname, response_payload.username, response_payload.role, rs.result.token, rs.result.time_out_token)
          let role = this.localStorageService.getRole()
          if (role !== 'admin') {
            window.location.href = '/'
          }
          else {
            window.location.href = 'admin/dashboard'
          }
          this.spinner.hide()
          Swal.fire({
            showCloseButton: true,
            showConfirmButton: false,
            icon: "success",
            // title: rs?.status_code,
            text: rs?.message,
            timer: 2000,
          });
        }
        else {
          this.spinner.hide()
          Swal.fire({
            showCloseButton: true,
            showConfirmButton: false,
            icon: "error",
            // title: rs?.status_code,
            text: rs?.message,
          });
        }
      })
    }
  }
}
