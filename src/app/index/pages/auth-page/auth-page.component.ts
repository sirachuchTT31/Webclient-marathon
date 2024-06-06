import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthServices } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CryptlibService } from '../../services/crypt-lib.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent {
  login_form: FormGroup
  register_form: FormGroup
  menu = 'login'
  subscription!: Subscription
  constructor(
    private authService: AuthServices,
    private localStorageService: LocalStorageService,
    private spinner: NgxSpinnerService,
    private CryptLibService: CryptlibService
  ) {
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
  changeMenu(menu: any,) {
    this.menu = menu
  }
  validateLogin() {
    if (this.login_form.valid == true) {
      return true
    }
    else {
      return false
    }
  }
  validateRegister() {
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
      const auth = this.authService.postLogin(param).subscribe((rs) => {
        if (rs?.status == true) {
          let response = rs.result
          this.localStorageService.setProfile(
            {
              id: response.payload.id,
              username: response.payload.username,
              avatar: '',
              expired_token: response.payload.exp,
              first_name: response.payload.name,
              last_name: response.payload.lastname,
              refresh_token: response.refresh_token,
              role: response.payload.role,
              authen_log_id : response.authen_log_id,
              token: response.access_token
            });
          let storageRole = this.localStorageService.getRole()
          let role = this.CryptLibService.decryptCipher(storageRole ? storageRole : '')
          if (role !== 'admin') {
            window.location.href = '/user'
          }
          else {
            window.location.href = 'back-office/dashboard'
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
      });
      this.subscription?.add(auth)
    }
  }
  register() {
    this.spinner.show()
    if (this.register_form.controls['type'].value == 'member') {

      let param = {
        username: this.register_form.controls['username'].value,
        password: this.register_form.controls['password'].value,
        name: this.register_form.controls['name'].value,
        lastname: this.register_form.controls['lastname'].value,
        email: this.register_form.controls['email'].value
      }
      const register = this.authService.postRegisterMember(param).subscribe(async (rs) => {
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
      });
      this.subscription?.add(register)
    }
    else {
      let param = {
        username: this.register_form.controls['username'].value,
        password: this.register_form.controls['password'].value,
        name: this.register_form.controls['name'].value,
        lastname: this.register_form.controls['lastname'].value,
        email: this.register_form.controls['email'].value
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
  routeIndex() {
    window.location.href = '/'
  }
}
