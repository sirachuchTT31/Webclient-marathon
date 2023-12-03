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
      type: new FormControl('member', [Validators.required]),
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
  checkRegister() {
    console.log("this.register_form", this.register_form.valid)
    if (this.register_form.valid == true) {
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
  register() {
    this.spinner.show()
    if (this.register_form.controls['type'].value == 'member') {

      let param = {
        member_username: this.register_form.controls['username'].value,
        member_password: this.register_form.controls['password'].value,
        member_name: this.register_form.controls['name'].value,
        member_lastname: this.register_form.controls['lastname'].value,
        member_email: this.register_form.controls['email'].value
      }
      this.authService.postRegisterMember(param).subscribe(async (rs) => {
        if (rs?.status == true) {
          this.spinner.hide()
          await Swal.fire({
            showCloseButton: true,
            showConfirmButton: false,
            icon: "success",
            // title: rs?.status_code,
            text: rs?.message,
            timer: 2000,
          });
          window.location.href = 'auth/login'
        }
        else {
          this.spinner.hide()
          await Swal.fire({
            showCloseButton: true,
            showConfirmButton: false,
            icon: "error",
            // title: rs?.status_code,
            text: rs?.message,
          });
        }
      })
    }
    else {
      let param = {
        organ_username: this.register_form.controls['username'].value,
        organ_password: this.register_form.controls['password'].value,
        organ_name: this.register_form.controls['name'].value,
        organ_lastname: this.register_form.controls['lastname'].value,
        organ_email: this.register_form.controls['email'].value
      }
      this.authService.postRegisterOrganizer(param).subscribe(async (rs) => {
        if (rs?.status == true) {
          this.spinner.hide()
          await Swal.fire({
            showCloseButton: true,
            showConfirmButton: false,
            icon: "success",
            // title: rs?.status_code,
            text: rs?.message,
            timer: 2000,
          });
          window.location.href = 'auth/login'
        }
        else {
          this.spinner.hide()
          await Swal.fire({
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
